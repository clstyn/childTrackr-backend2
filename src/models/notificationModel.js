const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;
