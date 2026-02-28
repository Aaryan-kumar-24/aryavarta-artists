const router = require("express").Router(); // ✅ ADD THIS
const auth = require("../middleware/authMiddleware"); // ✅ ADD
const { create, getByArtist, updateStatus } = require("../controllers/commissionController"); // ✅ ADD

const multer = require("multer");

// 📦 MULTER CONFIG
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// 🚀 ROUTES
router.post("/", auth, upload.single("image"), create);
router.get("/", auth, getByArtist);
router.put("/:id", auth, updateStatus);

module.exports = router; // ✅ ADD THIS