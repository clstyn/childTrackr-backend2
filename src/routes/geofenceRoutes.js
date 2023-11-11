const express = require("express");
const router = express.Router();
const geofenceController = require("../controllers/geofenceController");
// const { authenticateToken } = require("../middleware/authMiddleware");

router.post("/data", geofenceController.saveGeofenceData);

router.get("/data", geofenceController.getGeofenceData);

router.put("/data/:username", geofenceController.updateGeofenceLocation);

router.get("/data/:username", geofenceController.getGeofenceByUsername);

module.exports = router;
