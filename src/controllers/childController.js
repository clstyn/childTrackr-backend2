const childRegistration = require("../models/childModel");
const ChildProfile = require("../models/childprofileModel");
const childCoord = require("../models/childCoModel");

// Controller untuk mendaftarkan anak baru
async function registerChild(req, res) {
  try {
    const { username, password } = req.body;

    // Normalisasi username ke huruf kecil
    const normalizedUsername = username.toLowerCase();

    const existingUser = await childRegistration.findOne({
      username: normalizedUsername,
    });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const childregistration = await childRegistration.create({
      username: normalizedUsername, // Simpan nama pengguna yang sudah dinormalisasi
      password,
    });

    res.status(200).json(childregistration);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

// Controller untuk login anak
async function loginChild(req, res) {
  try {
    const { username, password } = req.body;

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
}

// Controller untuk mendapatkan semua data profil anak
async function getChildlogin(req, res) {
  try {
    const childregistration = await childRegistration.find({});
    res.status(200).json(childregistration);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

// Controller untuk mendapatkan data login anak
async function getChildProfiles(req, res) {
  try {
    const childProfiles = await ChildProfile.find();
    res.status(200).json(childProfiles);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Terjadi kesalahan dalam mengambil data Child Profile." });
  }
}

// Controller untuk menambah profil anak baru
async function addChildProfile(req, res) {
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
}

// Controller untuk menghapus profil anak berdasarkan ID
async function deleteChildProfile(req, res) {
  try {
    const { id } = req.params;

    await ChildProfile.findByIdAndDelete(id);

    res.status(200).json({ message: "Child profile deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

// Controller untuk mengirimkan data koordinat anak
async function ChildCoords(req, res) {
  try {
    const { username, latitude, longitude } = req.body;
    console.log("Received data:", username, latitude, longitude);
    const newChildCoord = await childCoord.create({
      username,
      latitude,
      longitude,
    });

    res.status(200).json(newChildCoord);
  } catch (error) {
    console.error("Error saving coordinate:", error);
    res.status(500).json({ error: "An error occurred" });
  }
}

// Controller untuk update data koordinat anak
async function updateChildCoords(req, res) {
  const { username } = req.body;

  try {
    const child = await childCoord.findOne({ username });
    if (child) {
      res.json({
        username: child.username,
        latitude: child.latitude,
        longitude: child.longitude,
      });
    } else {
      res.status(404).json({ error: "Data koordinat tidak ditemukan." });
    }
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan pada server." });
  }
}

// Controller untuk mendapatkan semua data koordinat anak
async function getChildCoords(req, res) {
  try {
    // Mengambil semua data dari koleksi ChildCoord
    const childCoords = await childCoord.find({});

    // Mengirim data sebagai respons
    res.status(200).json(childCoords);
  } catch (error) {
    console.error("Error retrieving coordinates:", error);
    res.status(500).json({ error: "An error occurred" });
  }
}

// Controller untuk update data koordinat anak berdasarkan username
async function liveChildCoords(req, res) {
  const { username } = req.params;
  const { latitude, longitude } = req.body;

  try {
    const existingData = await childCoord.findOne({ username });

    if (existingData) {
      existingData.latitude = latitude;
      existingData.longitude = longitude;
      await existingData.save();
      return res
        .status(200)
        .json({ message: "Coordinate updated successfully" });
    } else {
      // Data doesn't exist, create new
      const newCoordinate = new childCoord({
        username,
        latitude,
        longitude,
      });
      await newCoordinate.save();
      return res.status(200).json({ message: "Coordinate added successfully" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update coordinate" });
  }
}

module.exports = {
  registerChild,
  loginChild,
  getChildProfiles,
  addChildProfile,
  deleteChildProfile,
  getChildlogin,
  ChildCoords,
  getChildCoords,
  updateChildCoords,
  liveChildCoords,
};
