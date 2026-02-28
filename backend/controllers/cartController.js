const Cart = require("../models/Cart");

// ✅ ADD TO CART
exports.addToCart = async (req, res) => {
  const { artworkId } = req.body;

  let cart = await Cart.findOne({ user: req.user });

  if (!cart) {
    cart = await Cart.create({ user: req.user, items: [] });
  }

  const exists = cart.items.find(
    (item) =>
      item.artwork && item.artwork.toString() === artworkId
  );

  if (exists) return res.json("Already in cart");

  cart.items.push({
    artwork: artworkId,
    quantity: 1
  });

  await cart.save();
  res.json(cart);
};

// ✅ REMOVE FROM CART
exports.removeFromCart = async (req, res) => {
  const { id } = req.params;

  let cart = await Cart.findOne({ user: req.user });

  if (!cart) return res.json("Cart empty");

  cart.items = cart.items.filter(item => {
    if (item.artwork && item.artwork.toString() === id) return false;
    if (item.commission && item.commission.toString() === id) return false;
    return true;
  });

  await cart.save();
  res.json(cart);
};

// ✅ GET CART
exports.getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user })
    .populate("items.artwork")
    .populate("items.commission");

  res.json(cart);
};