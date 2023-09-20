const express = require("express");
const router = express.Router();
const geofenceHistoryController = require("../controllers/geofenceHistoryController");

// Rute untuk menyimpan data Geofence ke dalam database (POST)
router.post("/data", geofenceHistoryController.saveGeofenceHistoryData);

// Rute untuk mengambil semua data Geofence dari database dalam format history (GET)
router.get("/data", geofenceHistoryController.getGeofenceHistory);

module.exports = router;
