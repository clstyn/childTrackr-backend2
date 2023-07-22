// middleware/authMiddleware.js

const User = require("../models/User");

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
