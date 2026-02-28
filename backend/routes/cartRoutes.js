const router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const {
  addToCart,
  getCart,
  removeFromCart
} = require("../controllers/cartController");

// ✅ ROUTES
router.post("/add", auth, addToCart);
router.get("/", auth, getCart);
router.delete("/remove/:id", auth, removeFromCart);

module.exports = router;