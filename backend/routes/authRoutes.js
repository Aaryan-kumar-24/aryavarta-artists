const router = require("express").Router();
const { signup, login } = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);
const User = require("../models/User"); // 🔥 ADD THIS

// ✅ GET ALL SELLERS (ARTISTS)
router.get("/artists", async (req, res) => {
  try {
    const artists = await User.find({ role: "seller" })
      .select("_id username email");

    res.json(artists);
  } catch (err) {
    res.status(500).json("Error fetching artists");
  }
});
module.exports = router;