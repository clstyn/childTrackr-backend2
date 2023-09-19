// controllers/geofenceController.js
const Geofence = require("../models/geofence");

// Menyimpan data Geofence ke dalam database
exports.saveGeofenceData = (req, res) => {
  const { username, latitude, longitude, radius, start_time, end_time } =
    req.body;

  if (
    !username ||
    !latitude ||
    !longitude ||
    !radius ||
    !start_time ||
    !end_time
  ) {
    return res.status(400).json({ error: "Semua kolom harus diisi" });
  }

  const newGeofence = new Geofence({
    username,
    latitude,
    longitude,
    radius,
    start_time,
    end_time,
  });

  newGeofence.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Gagal menyimpan data Geofence" });
    } else {
      res.status(201).json({ message: "Data Geofence berhasil disimpan" });
    }
  });
};

// Mengambil semua data Geofence dari database
exports.getGeofenceData = (req, res) => {
  Geofence.find({}, (err, geofences) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Gagal mengambil data Geofence" });
    } else {
      res.status(200).json(geofences);
    }
  });
};
