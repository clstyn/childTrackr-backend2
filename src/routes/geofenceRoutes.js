// routes/geofenceRoutes.js
const express = require("express");
const router = express.Router();
const geofenceController = require("../controllers/geofenceController");

// Rute untuk menyimpan data Geofence ke dalam database
router.post("/save_geofence_data", geofenceController.saveGeofenceData);

// Rute untuk mengambil semua data Geofence dari database
router.get("/get_geofence_data", geofenceController.getGeofenceData);

module.exports = router;
