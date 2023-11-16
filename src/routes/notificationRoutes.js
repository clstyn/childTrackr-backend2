const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

router.post("/data", notificationController.saveNotificationData);

router.get("/data", notificationController.getNotificationData);

router.get(
  "/data/:username",
  notificationController.getNotificationsByUsername
);

module.exports = router;
