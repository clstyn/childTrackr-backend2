const childRegistration = require("../models/childModel");
const ChildProfile = require("../models/childProfileModel");
const childCoord = require("../models/childCoModel");

async function registerChild(req, res) {
  try {
    const { username, password } = req.body;

    const normalizedUsername = username;

    const existingUser = await childRegistration.findOne({
      username: normalizedUsername,
    });

    if (existingUser) {
      return res.status(400).json({ message: "Username sudah terdaftar" });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(401).json({
        message:
          "Password harus terdiri dari minimal 8 karakter, 1 huruf besar, 1 huruf kecil, dan 1 angka",
      });
    }

    const childregistration = await childRegistration.create({
      username: normalizedUsername,
      password,
    });

    res
      .status(200)
      .json({ message: "Pendaftaran berhasil", childregistration });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

async function loginChild(req, res) {
  try {
    const { username, password } = req.body;

    const user = await childRegistration.findOne({ username });

    if (!user) {
      res
        .status(401)
        .json({ isAuthenticated: false, message: "Username tidak ditemukan" });
    } else {
      if (user.password === password) {
        res
          .status(200)
          .json({ message: "Login Berhasil", isAuthenticated: true, user });
      } else {
        res
          .status(401)
          .json({ isAuthenticated: false, message: "Password salah" });
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

async function getChildlogin(req, res) {
  try {
    const childregistration = await childRegistration.find({});
    res.status(200).json(childregistration);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

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

async function deleteChildProfile(req, res) {
  try {
    const { id } = req.params;

    await ChildProfile.findByIdAndDelete(id);

    res.status(200).json({ message: "Child profile berhasil dihapus" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

async function ChildCoords(req, res) {
  try {
    const { username, latitude, longitude } = req.body;

    if (!username || !latitude || !longitude) {
      return res.status(400).json({ message: "Data tidak lengkap" });
    }
    const newChildCoord = await childCoord.create({
      username,
      latitude,
      longitude,
    });

    res.status(200).json(newChildCoord);
  } catch (error) {
    console.error("Terjadi kesalahan saat ingin menyimpan koordinat:", error);
    res.status(500).json({ error: "Terjadi kesalahan pada server." });
  }
}

async function updateChildCoords(req, res) {
  const { username } = req.body;

  try {
    const child = await childCoord
      .findOne({ username })
      .sort({ timestamp: -1 });
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

async function getChildCoords(req, res) {
  try {
    const childCoords = await childCoord.find({});

    res.status(200).json(childCoords);
  } catch (error) {
    console.error("Terjadi kesalahan saat mengambil koordinat:", error);
    res.status(500).json({ error: "Terjadi kesalahan pada server." });
  }
}

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
        .json({ message: "Koordinat berhasil diperbaharui!" });
    } else {
      const newCoordinate = new childCoord({
        username,
        latitude,
        longitude,
      });
      await newCoordinate.save();
      return res
        .status(200)
        .json({ message: "Koordinat berhasil ditambahkan!" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Gagal memperbaharui koordinat" });
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
