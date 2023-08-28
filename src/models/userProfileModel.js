const mongoose = require("mongoose");

// Skema untuk profil pengguna
const userProfileSchema = mongoose.Schema({
  username: String,
  name: String,
});

// Buat model untuk profil pengguna
const UserProfile = mongoose.model("UserProfile", userProfileSchema);

module.exports = UserProfile;
