const mongoose = require("mongoose");

const geofenceHistorySchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  radius: {
    type: Number,
    required: true,
  },
  start_time: {
    type: String,
    required: true,
  },
  end_time: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const GeofenceHistory = mongoose.model(
  "GeofenceHistory",
  geofenceHistorySchema
);

module.exports = GeofenceHistory;
