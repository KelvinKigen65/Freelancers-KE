const express = require("express");
const Project = require("../models/Project");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ POST a new project (Client only)
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, description, budget, deadline } = req.body;

    // Validate role
    if (req.user.role !== "client") {
      return res.status(403).json({ message: "Only clients can post projects." });
    }

    // Validate required fields
    if (!title || !description || !budget) {
      return res.status(400).json({ message: "All fields are required: title, description, budget." });
    }

    const newProject = new Project({
      title,
      description,
      budget,
      deadline,
      clientId: req.user.id,
    });

    await newProject.save();
    res.status(201).json({ message: "Project created successfully", project: newProject });
  } catch (err) {
    console.error("❌ Project creation failed:", err.message);
    res.status(500).json({ message: "Internal server error while posting your project." });
  }
});

// 📄 GET all projects (Freelancer only)
router.get("/", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "freelancer") {
      return res.status(403).json({ message: "Only freelancers can view available projects." });
    }

    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error("❌ Project fetching error:", err.message);
    res.status(500).json({ message: "Internal error fetching projects." });
  }
});

// 📁 GET projects posted by logged-in client
router.get("/my-projects", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "client") {
      return res.status(403).json({ message: "Only clients can view their own projects." });
    }

    const myProjects = await Project.find({ clientId: req.user.id }).sort({ createdAt: -1 });
    res.json(myProjects);
  } catch (err) {
    console.error("❌ Client project fetch error:", err.message);
    res.status(500).json({ message: "Could not retrieve your projects." });
  }
});

module.exports = router;
