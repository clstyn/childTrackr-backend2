const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ isAuthenticated: false, message: "Token tidak ditemukan" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ isAuthenticated: false, message: "Token tidak valid" });
    }

    req.userId = decoded.userId;
    next();
  });
}

module.exports = { authenticateToken };
