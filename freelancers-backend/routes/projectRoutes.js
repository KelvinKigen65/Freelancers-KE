const express = require("express");
const Project = require("../models/Project");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ POST new project (Client only)
router.post("/", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "client") {
      return res.status(403).json({ message: "Only clients can post projects." });
    }

    const project = new Project({
      ...req.body,
      clientId: req.user.id,
    });

    await project.save();
    res.status(201).json(project);
  } catch (err) {
    console.error("❌ Error creating project:", err);
    res.status(500).json({ message: "Something went wrong while posting your project." });
  }
});

// 📄 GET all projects (Freelancer only)
router.get("/", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "freelancer") {
      return res.status(403).json({ message: "Only freelancers can view projects." });
    }

    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error("❌ Error fetching projects:", err);
    res.status(500).json({ message: "Something went wrong while retrieving projects." });
  }
});

module.exports = router;
