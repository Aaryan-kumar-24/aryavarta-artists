// routes/artworkRoutes.js
const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");

const {
  uploadArtwork,
  getAll
} = require("../controllers/artworkController");

// 📦 MULTER CONFIG (image upload)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// 🚀 ROUTES
const role = require("../middleware/roleMiddleware");
router.get("/artists", async (req, res) => {
  const users = await User.find({ role: "seller" }).select("_id name email");
  res.json(users);
});
router.post(
  "/upload",
  auth,
  role("seller"), // 🔥 ONLY SELLER CAN UPLOAD
  upload.single("image"),
  uploadArtwork
);
router.get("/", getAll);

module.exports = router;

