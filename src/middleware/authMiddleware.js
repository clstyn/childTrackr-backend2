const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.authenticateUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res
        .status(401)
        .json({ error: "Tidak dapat mengotentikasi pengguna." });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Terjadi kesalahan saat mengotentikasi." });
  }
};

// Middleware untuk memverifikasi token JWT
exports.verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ error: "Token tidak ditemukan. Akses ditolak." });
  }

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(403).json({ error: "Token tidak valid. Akses ditolak." });
  }
};
