const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const validator = require("validator");

// Fungsi untuk menghasilkan token JWT

const jwtSecret = "ChildTrackrSecret";
const generateToken = (user) => {
  return jwt.sign({ email: user.email, role: user.role }, jwtSecret, {
    expiresIn: "1h",
  });
};

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

  // Periksa apakah data email ada dan merupakan string
  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({ error: "Format email tidak valid." });
  }

  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res
        .status(401)
        .json({ error: "Kombinasi email dan kata sandi salah." });
    }

    // Jika pengguna berhasil login, kita akan menghasilkan token JWT
    const token = generateToken(user);

    res.status(200).json({ message: "Login berhasil.", user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Terjadi kesalahan saat masuk." });
  }
};
