const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  phone: String,
  email: String,
  state: String,
  city: String,
  address: String,
  message: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" } // ✅ ADD THIS
});

module.exports = mongoose.model("Contact", contactSchema);