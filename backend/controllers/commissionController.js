const Commission = require("../models/Commission");
const Cart = require("../models/Cart");
const Notification = require("../models/Notification"); // ✅ ONLY ONCE

// ✅ CREATE COMMISSION
exports.create = async (req, res) => {
  try {
    const commission = await Commission.create({
      ...req.body,
      image: req.file ? `/uploads/${req.file.filename}` : "",
      user: req.user,
      artist: req.body.artist
    });

    res.json(commission);
  } catch (err) {
    console.error(err);
    res.status(500).json("Error creating commission");
  }
};

// ✅ GET COMMISSIONS FOR ARTIST
exports.getByArtist = async (req, res) => {
  try {
    const data = await Commission.find({ artist: req.user })
      .populate("user");

    res.json(data);
  } catch (err) {
    res.status(500).json("Error fetching commissions");
  }
};

// ✅ UPDATE STATUS
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // 🔥 GET FULL COMMISSION WITH USER
    const commission = await Commission.findById(id);

    if (!commission) {
      return res.status(404).json("Commission not found");
    }

    // UPDATE STATUS
    commission.status = status;
    await commission.save();

    let message = "";

    // ✅ ACCEPTED
    if (status === "accepted") {
      message = "🎉 Your commission has been ACCEPTED!";

      let buyerCart = await Cart.findOne({ user: commission.user });

      if (!buyerCart) {
        buyerCart = await Cart.create({
          user: commission.user,
          items: []
        });
      }

      buyerCart.items.push({
        artwork: null,
        commission: commission._id,
        quantity: 1
      });

      await buyerCart.save();
    }

    // ✅ REJECTED
    if (status === "rejected") {
      message = "❌ Your commission has been REJECTED";

      // 🔥 DELETE AFTER USING DATA
      await Commission.findByIdAndDelete(id);
    }

    // ✅ CREATE NOTIFICATION (🔥 MAIN THING YOU WERE MISSING EARLIER)
// ✅ CREATE NOTIFICATION WITH FULL DATA
await Notification.create({
  user: commission.user,
  message,

  commissionData: {
    image: commission.image,
    price: commission.price,
    medium: commission.medium,
    custom: commission.custom,
    status: status
  }
});

    res.json("Updated");
  } catch (err) {
    console.error(err);
    res.status(500).json("Error updating status");
  }
};