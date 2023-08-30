const Registration = require("../models/userModel");
const UserProfile = require("../models/userProfileModel");

// Controller untuk mendaftarkan pengguna baru
async function registerUser(req, res) {
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
}

// Controller untuk login pengguna
async function loginUser(req, res) {
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
}

// Controller untuk mendapatkan semua data profil pengguna
async function getUserProfiles(req, res) {
  try {
    const userProfiles = await UserProfile.find();
    res.status(200).json(userProfiles);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Terjadi kesalahan dalam mengambil data User Profile." });
  }
}

async function getUserLogin(req, res) {
  try {
    const registration = await Registration.find({});
    res.status(200).json(registration);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

// Controller untuk menambah profil pengguna baru
async function addUserProfile(req, res) {
  try {
    const { username, name, latitude, longitude } = req.body;

    const newProfile = await UserProfile.create({
      username,
      name,
      latitude,
      longitude,
    });

    res.status(200).json(newProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Controller untuk menghapus profil pengguna berdasarkan ID
async function deleteUserProfile(req, res) {
  try {
    const { id } = req.params;

    // Hapus profil pengguna berdasarkan ID
    await UserProfile.findByIdAndDelete(id);

    res.status(200).json({ message: "User profile deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  registerUser,
  loginUser,
  getUserProfiles,
  addUserProfile,
  deleteUserProfile,
  getUserLogin,
};
