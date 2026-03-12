const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: ["http://localhost:3000", "http://127.0.0.1:3000"], // 🔥 FIX
  credentials: true
}));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Backend working ✅");
});
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/commission", require("./routes/commissionRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
const path = require("path");

// ADD THIS
app.use("/api/notifications", require("./routes/notificationRoutes"));  
app.use("/uploads", express.static("uploads"));

// ADD THIS
app.use("/api/artworks", require("./routes/artworkRoutes"));

app.use("/api/payment", require("./routes/paymentRoutes"));
app.listen(process.env.PORT, () =>
  console.log("Server running on port " + process.env.PORT)
);