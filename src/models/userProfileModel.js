const mongoose = require("mongoose");

const userProfileSchema = mongoose.Schema({
  username: String,
  name: String,
  latitude: Number,
  longitude: Number,
});

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

module.exports = UserProfile;
