// routes/geofenceRoutes.js
const express = require("express");
const router = express.Router();
const geofenceController = require("../controllers/geofenceController");
const { authenticateToken } = require("../middleware/authMiddleware");

// Rute untuk menyimpan data Geofence ke dalam database
router.post("/data", geofenceController.saveGeofenceData);

// Rute untuk mengambil semua data Geofence dari database
router.get("/data", authenticateToken, geofenceController.getGeofenceData);

router.put("/data/:username", geofenceController.updateGeofenceLocation);

// Rute untuk mengambil data Geofence berdasarkan username (GET)
router.get(
  "/data/:username",
  authenticateToken,
  geofenceController.getGeofenceByUsername
);

module.exports = router;
