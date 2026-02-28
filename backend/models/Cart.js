const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
items: [
  {
    artwork: { type: mongoose.Schema.Types.ObjectId, ref: "Artwork" },
    commission: { type: mongoose.Schema.Types.ObjectId, ref: "Commission" }, // 🔥 ADD
    quantity: Number
  }
]
});

module.exports = mongoose.model("Cart", cartSchema);