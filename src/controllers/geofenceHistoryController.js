const GeofenceHistory = require("../models/geofenceHistoryModel");

async function saveGeofenceHistoryData(req, res) {
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

    const newGeofenceHistory = new GeofenceHistory({
      username,
      latitude,
      longitude,
      radius,
      start_time,
      end_time,
    });

    await newGeofenceHistory.save();
    res.status(201).json({ message: "Data Geofence berhasil disimpan" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal menyimpan data Geofence" });
  }
}

async function getGeofenceHistory(req, res) {
  try {
    const geofenceshistory = await GeofenceHistory.find({}).sort({
      createdAt: -1,
    });

    res.status(200).json(geofenceshistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengambil data Geofence" });
  }
}

async function getHistoryByUsername(req, res) {
  const { username } = req.params;

  try {
    const history = await GeofenceHistory.find({ username }).sort({
      createdAt: -1,
    });

    res.status(200).json(history);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
}

module.exports = {
  saveGeofenceHistoryData,
  getGeofenceHistory,
  getHistoryByUsername,
};
