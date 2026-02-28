const mongoose = require("mongoose");

const commissionSchema = new mongoose.Schema({
  phone: String,
  email: String,
  medium: String,
  price: Number,
  artist: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // ✅ FIX
  custom: String,
  image: String,
  status: { type: String, default: "pending" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});
module.exports = mongoose.model("Commission", commissionSchema);