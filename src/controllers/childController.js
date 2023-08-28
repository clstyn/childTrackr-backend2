const childRegistration = require("../models/childModel");
const ChildProfile = require("../models/childprofileModel");

// Controller untuk mendaftarkan anak baru
async function registerChild(req, res) {
  try {
    const { username, password } = req.body;

    const existingUser = await childRegistration.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const childregistration = await childRegistration.create({
      username,
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

module.exports = {
  registerChild,
  loginChild,
  getChildProfiles,
  addChildProfile,
  deleteChildProfile,
  getChildlogin,
};
