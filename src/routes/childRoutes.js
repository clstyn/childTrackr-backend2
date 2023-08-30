const express = require("express");
const router = express.Router();
const childController = require("../controllers/childController");
// const { route } = require("./userRoutes");

// Rute untuk mendaftarkan anak baru
router.post("/childregister", childController.registerChild);

// Rute untuk login anak
router.post("/childlogin", childController.loginChild);

// Rute untuk mendapatkan semua data login anak
router.get("/childlogin", childController.getChildlogin);

// Rute untuk mendapatkan semua data profil anak
router.get("/childProfiles", childController.getChildProfiles);

// Rute untuk menambah profil anak baru
router.post("/childProfiles", childController.addChildProfile);

// Rute untuk menghapus profil anak berdasarkan ID
router.delete("/childProfiles/:id", childController.deleteChildProfile);

// Rute untuk menambahkan data koordinat anak
router.post("/coordinates", childController.ChildCoords);

// Rute untuk update data koordinat anak
router.post("/findCoordinates", childController.updateChildCoords);

// Rute untuk mendapatkan data koordinat anak
router.put("/findCoordinates/:username", childController.liveChildCoords);

// Rute untuk mendapatkan data koordinat anak
router.get("/findCoordinates", childController.getChildCoords);

module.exports = router;
