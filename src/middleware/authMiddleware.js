const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
  const token = req.headers.authorization;

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

    req.userId = decoded.userId;
    next();
  });
}

module.exports = { authenticateToken };
