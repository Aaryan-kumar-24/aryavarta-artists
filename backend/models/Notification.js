const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  message: String,

  // 🔥 ADD FULL COMMISSION SNAPSHOT
  commissionData: {
    image: String,
    price: Number,
    medium: String,
    custom: String,
    status: String
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Notification", notificationSchema);