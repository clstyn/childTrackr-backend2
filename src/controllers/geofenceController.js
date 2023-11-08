const Geofence = require("../models/geofenceModel");

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

async function getGeofenceData(req, res) {
  try {
    const geofences = await Geofence.find({});
    res.status(200).json(geofences);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengambil data Geofence" });
  }
}

async function updateGeofenceLocation(req, res) {
  const { username } = req.params;
  const { latitude, longitude, start_time, end_time, radius } = req.body;

  try {
    const geofence = await Geofence.findOne({ username });

    if (geofence) {
      geofence.latitude = latitude;
      geofence.longitude = longitude;
      geofence.start_time = start_time;
      geofence.end_time = end_time;
      geofence.radius = radius;

      await geofence.save();
      return res
        .status(200)
        .json({ message: "Data lokasi berhasil diperbarui" });
    } else {
      const newGeofence = new Geofence({
        username,
        latitude,
        longitude,
        radius,
        start_time,
        end_time,
      });
      await newGeofence.save();
      return res
        .status(200)
        .json({ message: "Data lokasi berhasil diperbarui" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Terjadi kesalahan pada server." });
  }
}

async function getGeofenceByUsername(req, res) {
  const { username } = req.params;

  try {
    const geofence = await Geofence.findOne({ username });

    if (!geofence) {
      return res.status(404).json({ error: "Data Geofence tidak ditemukan." });
    }

    res.status(200).json(geofence);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Terjadi kesalahan pada server." });
  }
}

module.exports = {
  saveGeofenceData,
  getGeofenceData,
  updateGeofenceLocation,
  getGeofenceByUsername,
};
