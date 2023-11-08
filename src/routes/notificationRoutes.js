const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const { authenticateToken } = require("../middleware/authMiddleware");

// Rute untuk menyimpan data Geofence ke dalam database (POST)
router.post("/data", notificationController.saveNotificationData);

// Rute untuk mengambil semua data Geofence dari database dalam format history (GET)
router.get(
  "/data",
  authenticateToken,
  notificationController.getNotificationData
);

module.exports = router;
