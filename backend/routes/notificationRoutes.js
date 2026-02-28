const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const Notification = require("../models/Notification");

// ✅ GET USER NOTIFICATIONS
router.get("/", auth, async (req, res) => {
  const notes = await Notification.find({ user: req.user }).sort({ createdAt: -1 });
  res.json(notes);
});
// ❌ DELETE NOTIFICATION
router.delete("/:id", auth, async (req, res) => {
  try {
    await Notification.findOneAndDelete({
      _id: req.params.id,
      user: req.user   // ✅ SECURITY (only own notifications)
    });

    res.json({ message: "Notification removed" });
  } catch (err) {
    res.status(500).json("Error deleting notification");
  }
});
module.exports = router;