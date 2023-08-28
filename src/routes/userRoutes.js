const express = require("express");
const router = express.Router();
const Registration = require("../models/userModel");
const UserProfile = require("../models/userProfileModel");

// Rute untuk mendapatkan semua pengguna
// router.get("/register", async (req, res) => {
//   try {
//     const registration = await Registration.find({});
//     res.status(200).json(registration);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ message: error.message });
//   }
// });

// Rute untuk mendaftarkan pengguna baru
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Periksa apakah username sudah ada dalam database
    const existingUser = await Registration.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Buat pengguna baru dan simpan ke database
    const registration = await Registration.create({ username, password });

    res.status(200).json(registration);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

router.get("/login", async (req, res) => {
  try {
    const registration = await Registration.find({});
    res.status(200).json(registration);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Rute untuk login pengguna
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Mencari pengguna berdasarkan username di database
    const user = await Registration.findOne({ username });

    if (!user) {
      res.status(401).json({ isAuthenticated: false });
    } else {
      if (user.password === password) {
        res.status(200).json({ isAuthenticated: true });
      } else {
        res.status(401).json({ isAuthenticated: false });
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

router.get("/addProfile", async (req, res) => {
  try {
    const newProfile = await UserProfile.find({});
    res.status(200).json(newProfile);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

router.post("/addProfile", async (req, res) => {
  try {
    const { username, name } = req.body;

    const newProfile = await UserProfile.create({
      username,
      name,
    });

    res.status(200).json(newProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rute untuk menghapus profil pengguna berdasarkan ID
router.delete("/userProfiles/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Hapus profil pengguna berdasarkan ID
    await UserProfile.findByIdAndDelete(id);

    res.status(200).json({ message: "User profile deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
