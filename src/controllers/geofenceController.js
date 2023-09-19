const Geofence = require("../models/geofence");

// Controller untuk menyimpan data Geofence ke dalam database
async function saveGeofenceData(req, res) {
  try {
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

    await newGeofence.save();
    res.status(201).json({ message: "Data Geofence berhasil disimpan" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal menyimpan data Geofence" });
  }
}

// Controller untuk mengambil semua data Geofence dari database
async function getGeofenceData(req, res) {
  try {
    const geofences = await Geofence.find({});
    res.status(200).json(geofences);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengambil data Geofence" });
  }
}

module.exports = {
  saveGeofenceData,
  getGeofenceData,
};
