const express = require("express");
const router = express.Router();
const childRegistration = require("../models/childModel");
const ChildProfile = require("../models/childprofileModel");

// Rute untuk mendapatkan semua data registrasi anak
// router.get("/childregister", async (req, res) => {
//   try {
//     const childregistration = await childRegistration.find({});
//     res.status(200).json(childregistration);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ message: error.message });
//   }
// });

// Rute untuk mendaftarkan anak baru
router.post("/childregister", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Periksa apakah username sudah ada dalam database
    const existingUser = await childRegistration.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Buat pengguna baru dan simpan ke database
    const childregistration = await childRegistration.create({
      username,
      password,
    });

    res.status(200).json(childregistration);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

router.get("/childlogin", async (req, res) => {
  try {
    const childregistration = await childRegistration.find({});
    res.status(200).json(childregistration);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Rute untuk login anak
router.post("/childlogin", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Mencari pengguna berdasarkan username di database
    const user = await childRegistration.findOne({ username });

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

// Rute untuk mendapatkan semua data profil anak
router.get("/childProfiles", async (req, res) => {
  try {
    const childProfiles = await ChildProfile.find();
    res.status(200).json(childProfiles);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Terjadi kesalahan dalam mengambil data Child Profile." });
  }
});

router.post("/childProfiles", async (req, res) => {
  try {
    const { username, name, latitude, longitude } = req.body;

    const newProfile = await ChildProfile.create({
      username,
      name,
      latitude,
      longitude,
    });

    res.status(200).json(newProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rute untuk menghapus profil anak berdasarkan ID
router.delete("/childProfiles/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Hapus child profile berdasarkan ID
    await ChildProfile.findByIdAndDelete(id);

    res.status(200).json({ message: "Child profile deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
