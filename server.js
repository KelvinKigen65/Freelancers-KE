const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");

const app = express();

// 🌐 CORS: Allow React frontend & preflight requests
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000", // Use .env value if available
    credentials: true,
  })
);
app.options("*", cors()); // ✅ Handle preflight for all routes

// 📦 Parse incoming JSON
app.use(express.json());

// 🔑 API Routes
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

// 📌 Port
const PORT = process.env.PORT || 5000;

// 🔗 Connect to MongoDB and start server
//mongoose.connect(process.env.MONGO_URI, {
 //   useNewUrlParser: true,
 //   useUnifiedTopology: true,
 // })
 // .then(() => {
 //   console.log("✅ Connected to MongoDB");
//    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
 // })
 // .catch((err) => console.error("❌ MongoDB connection error:", err.message));
mongoose.connect(process.env.MONGO_URI)

  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

mongoose.connection.once("open", () => {
  console.log("🧠 Connected to DB:", mongoose.connection.name);
});
