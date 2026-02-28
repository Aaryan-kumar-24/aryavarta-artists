const router = require("express").Router();
const { submit } = require("../controllers/contactController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, submit);
module.exports = router;