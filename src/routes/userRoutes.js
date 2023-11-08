const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticateToken } = require("../middleware/authMiddleware");

// Rute untuk mendaftarkan pengguna baru
router.post("/register", userController.registerUser);

// Rute untuk login pengguna
router.post("/login", userController.loginUser);

// Rute untuk mendapatkan semua data profil pengguna
router.get("/login", authenticateToken, userController.getUserLogin);

// Rute untuk melakukan verif email
router.get("/verify/:id", userController.verificationEmail);

// Rute untuk mendapatkan semua data login pengguna
router.get("/userProfiles", authenticateToken, userController.getUserProfiles);

// Rute untuk menambah profil pengguna baru
router.post("/addProfile", userController.addUserProfile);

// Rute untuk menghapus profil pengguna berdasarkan ID
router.delete("/userProfiles/:id", userController.deleteUserProfile);

router.get("/me", authenticateToken, userController.getLoggedInUser);

module.exports = router;
