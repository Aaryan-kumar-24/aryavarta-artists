const Artwork = require("../models/Artwork");

exports.uploadArtwork = async (req, res) => {
  const { title, description, price } = req.body;

  const art = await Artwork.create({
    title,
    description,
    price,
    image: `/uploads/${req.file.filename}`, // 🔥 FIXED
    seller: req.user
  });

  res.json(art);
};

exports.getAll = async (req, res) => {
  const arts = await Artwork.find();
  res.json(arts);
};