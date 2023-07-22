// controllers/locationController.js

const Location = require("../models/location");
const { isOutsideGeofence } = require("../utils/geofence");

// Endpoint untuk menerima data lokasi anak
exports.trackLocation = async (req, res) => {
  const { userId, latitude, longitude } = req.body;
  const user = req.user; // Pengguna yang telah diverifikasi oleh middleware authMiddleware.authenticateUser

  // Pastikan hanya anak-anak yang dapat mengirimkan lokasi
  if (user.role !== "child" || user.username !== userId) {
    return res
      .status(403)
      .json({ error: "Anda tidak diizinkan mengirimkan lokasi." });
  }

  // Simpan data lokasi anak ke database
  try {
    const location = new Location({ userId, latitude, longitude });
    await location.save();
    res.status(200).json({ message: "Lokasi berhasil dilacak." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Terjadi kesalahan saat melacak lokasi." });
  }

  // Cek apakah anak berada di luar geofence dan kirim notifikasi jika iya
  const targetLat = 12.345; // Ganti dengan lintang geofence yang diinginkan
  const targetLon = 67.89; // Ganti dengan bujur geofence yang diinginkan
  const geofenceRadius = 1000; // Ganti dengan radius geofence yang diinginkan (dalam meter)

  if (
    isOutsideGeofence(latitude, longitude, targetLat, targetLon, geofenceRadius)
  ) {
    // Implementasi kirim notifikasi di sini (bisa menggunakan layanan notifikasi seperti Firebase Cloud Messaging)
    console.log("Anak berada di luar geofence!");
  }
};
