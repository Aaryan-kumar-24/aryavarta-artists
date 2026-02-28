const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json("No token");

  // ✅ FIX: remove "Bearer "
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

const user = await User.findById(decoded.id);

if (!user) return res.status(404).json("User not found"); // ✅ ADD

req.user = user._id;
    req.userRole = user.role;

    next();
  } catch (err) {
    res.status(401).json("Invalid token");
  }
};