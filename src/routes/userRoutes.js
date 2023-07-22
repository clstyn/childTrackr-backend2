// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Rute untuk mendapatkan semua data pengguna
router.get("/users", async (req, res) => {
  try {
    const users = await User.find(); // Ambil semua data pengguna dari koleksi "users"
    res.status(200).json(users); // Kirim data pengguna sebagai respons JSON
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat mengambil data pengguna." });
  }
});

module.exports = router;
