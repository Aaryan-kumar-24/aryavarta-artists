const Contact = require("../models/Contact");

exports.submit = async (req, res) => {
const data = await Contact.create({
  ...req.body,
  user: req.user   // ✅ ADD THIS
});
  res.json(data);
};