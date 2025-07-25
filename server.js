const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");

const app = express();

// === CORS CONFIG ===
const allowedOrigins = [
  "http://localhost:3000",
  "https://freelance-portal-uwh3.onrender.com",
  process.env.CLIENT_URL || "https://freelance-portal-uwh3.onrender.com"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.options("*", cors()); // Handle preflight requests

// === MIDDLEWARE ===
app.use(express.json());

// === ROUTES ===
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

// === DEFAULT ROUTE ===
app.get("/", (req, res) => {
  res.send("🚀 FreelancersKE backend is running");
});

app.all("*", (req, res) => {
  res.status(404).json({ message: `🔍 Route not found: ${req.originalUrl}` });
});

// === SERVER START ===
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

mongoose.connection.once("open", () => {
  console.log("🧠 Connected to DB:", mongoose.connection.name);
});
