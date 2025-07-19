const express = require('express');
const Project = require('../models/Project');
const { auth, optionalAuth, isClient } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/projects
// @desc    Create a new project
// @access  Private (Client only)
router.post('/', auth, isClient, async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      skills,
      budgetMin,
      budgetMax,
      deadline,
      location
    } = req.body;

    // Validation
    if (!title || !description || !category || !budgetMin || !budgetMax) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    if (budgetMin >= budgetMax) {
      return res.status(400).json({ message: 'Maximum budget must be greater than minimum budget' });
    }

    const project = new Project({
      title,
      description,
      client: req.user._id,
      category,
      skills: skills ? skills.split(',').map(skill => skill.trim()) : [],
      budget: {
        min: budgetMin,
        max: budgetMax
      },
      deadline: deadline || null,
      location: location || 'Remote'
    });

    await project.save();

    res.status(201).json({
      message: 'Project created successfully',
      project
    });

  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/projects
// @desc    Get all projects with filtering and pagination
// @access  Public
router.get('/', optionalAuth, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      search,
      minBudget,
      maxBudget,
      status = 'open'
    } = req.query;

    const query = { isActive: true, status };

    // Category filter
    if (category) {
      query.category = category;
    }

    // Budget filter
    if (minBudget || maxBudget) {
      query.budget = {};
      if (minBudget) query.budget.$gte = parseInt(minBudget);
      if (maxBudget) query.budget.$lte = parseInt(maxBudget);
    }

    // Search filter
    if (search) {
      query.$text = { $search: search };
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      populate: {
        path: 'client',
        select: 'name email rating totalReviews'
      },
      sort: { createdAt: -1 }
    };

    const projects = await Project.paginate(query, options);

    res.json(projects);

  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/projects/:id
// @desc    Get project by ID
// @access  Public
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('client', 'name email rating totalReviews')
      .populate({
        path: 'bids',
        populate: {
          path: 'freelancer',
          select: 'name email rating totalReviews'
        }
      });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (!project.isActive) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Increment views
    project.views += 1;
    await project.save();

    res.json({ project });

  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/projects/:id
// @desc    Update project
// @access  Private (Project owner only)
router.put('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user is the project owner
    if (project.client.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this project' });
    }

    const {
      title,
      description,
      category,
      skills,
      budgetMin,
      budgetMax,
      deadline,
      location,
      status
    } = req.body;

    // Update fields
    if (title) project.title = title;
    if (description) project.description = description;
    if (category) project.category = category;
    if (skills) project.skills = skills.split(',').map(skill => skill.trim());
    if (budgetMin && budgetMax) {
      if (budgetMin >= budgetMax) {
        return res.status(400).json({ message: 'Maximum budget must be greater than minimum budget' });
      }
      project.budget = { min: budgetMin, max: budgetMax };
    }
    if (deadline !== undefined) project.deadline = deadline;
    if (location) project.location = location;
    if (status) project.status = status;

    await project.save();

    res.json({
      message: 'Project updated successfully',
      project
    });

  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/projects/:id
// @desc    Delete project
// @access  Private (Project owner only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user is the project owner
    if (project.client.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this project' });
    }

    // Soft delete
    project.isActive = false;
    await project.save();

    res.json({ message: 'Project deleted successfully' });

  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/projects/user/my-projects
// @desc    Get current user's projects
// @access  Private
router.get('/user/my-projects', auth, async (req, res) => {
  try {
    const projects = await Project.find({ 
      client: req.user._id,
      isActive: true 
    }).sort({ createdAt: -1 });

    res.json({ projects });

  } catch (error) {
    console.error('Get user projects error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 