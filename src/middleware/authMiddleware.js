const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;
// const Registration = require("../models/userModel");

function authenticateToken(req, res, next) {
  const token = req.headers.authorization; // Anda bisa mengirim token melalui header Authorization

  if (!token) {
    return res
      .status(401)
      .json({ isAuthenticated: false, message: "Token not provided" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ isAuthenticated: false, message: "Invalid token" });
    }

    // Token valid, lanjutkan ke rute yang dilindungi
    req.userId = decoded.userId;
    next();
  });
}

module.exports = { authenticateToken };
