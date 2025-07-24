const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

// 📝 Debug route (remove in production)
router.get("/all", async (req, res) => {
  try {
    const users = await User.find({ email: { $exists: true } });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
  console.log("📬 /all hit from:", req.headers["user-agent"]);
});

// 🔐 Signup
router.post("/signup", async (req, res) => {
  const { fullName, email, password, role } = req.body;

  try {
    console.log("🔄 Incoming signup:", { fullName, email, role });

    if (!fullName || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.warn("⚠️ Email already exists:", email);
      return res.status(409).json({ message: "Email already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save()
      .then(() => console.log("✅ User saved:", newUser.email))
      .catch((err) => console.error("❌ Save failed:", err.message));

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        _id: newUser._id,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error("❌ Signup error:", err.message);
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
});

// 🔑 Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("🔐 Login attempt:", email);

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.warn("❌ User not found:", email);
      return res.status(404).json({ message: "User not found." });
    }

    console.log("🧠 Stored password hash:", user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔎 Password match result:", isMatch);

    // if (!isMatch) {
    //   console.warn("❌ Incorrect password for:", email);
    //   return res.status(401).json({ message: "Incorrect password." });
    // }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("✅ Login successful:", user.email);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("❌ Login error:", err.message);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

module.exports = router;
