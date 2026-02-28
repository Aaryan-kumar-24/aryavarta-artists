// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  phone: String,
  password: String,
  role: { type: String, enum: ["buyer", "seller"] }
});

module.exports = mongoose.model("User", userSchema);