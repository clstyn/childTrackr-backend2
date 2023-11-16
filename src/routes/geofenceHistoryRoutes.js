const express = require("express");
const router = express.Router();
const geofenceHistoryController = require("../controllers/geofenceHistoryController");
// const { authenticateToken } = require("../middleware/authMiddleware");

router.post("/data", geofenceHistoryController.saveGeofenceHistoryData);

router.get("/data", geofenceHistoryController.getGeofenceHistory);

router.get("/data/:username", geofenceHistoryController.getHistoryByUsername);

module.exports = router;
