const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");

const app = express();

// 🌐 CORS: Allow React frontend & preflight requests
app.use(
  cors({
    origin: "http://localhost:3000", // match your React dev server
    credentials: true,
  })
);
app.options("*", cors()); // ✅ Handle preflight for all routes

// 📦 Parse incoming JSON
app.use(express.json());

// 🚀 API Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

// 🏠 Base route
app.get("/", (req, res) => {
  res.send("🚀 FreelancersKE backend is running");
});

// ✅ Fixed catch-all route
app.all("*", (req, res) => {
  res.status(404).json({ message: `🔍 Route not found: ${req.originalUrl}` });
});

// 🔗 Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(5500, () => console.log("✅ Server listening on port 5000"));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));