// controllers/authController.js

const User = require("../models/User");
const validator = require("validator");

exports.register = async (req, res) => {
  const { email, password, role } = req.body;

  // Validasi email menggunakan validator
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Format email tidak valid." });
  }

  try {
    const user = new User({ email, password, role });
    await user.save();
    res.status(201).json({ message: "Pendaftaran berhasil." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Terjadi kesalahan saat mendaftar." });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Validasi email menggunakan validator
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Format email tidak valid." });
  }

  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res
        .status(401)
        .json({ error: "Kombinasi nama pengguna dan kata sandi salah." });
    }

    res.status(200).json({ message: "Login berhasil.", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Terjadi kesalahan saat masuk." });
  }
};
