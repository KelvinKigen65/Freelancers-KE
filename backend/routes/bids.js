const express = require('express');
const Bid = require('../models/Bid');
const Project = require('../models/Project');
const { auth, isFreelancer } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/bids
// @desc    Create a new bid
// @access  Private (Freelancer only)
router.post('/', auth, isFreelancer, async (req, res) => {
  try {
    const { projectId, amount, proposal, timeline, message } = req.body;

    // Validation
    if (!projectId || !amount || !proposal || !timeline) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    // Check if project exists and is open
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.status !== 'open') {
      return res.status(400).json({ message: 'Project is not accepting bids' });
    }

    if (!project.isActive) {
      return res.status(400).json({ message: 'Project is not active' });
    }

    // Check if user already bid on this project
    const existingBid = await Bid.findOne({
      project: projectId,
      freelancer: req.user._id
    });

    if (existingBid) {
      return res.status(400).json({ message: 'You have already bid on this project' });
    }

    // Validate bid amount
    if (amount < project.budget.min || amount > project.budget.max) {
      return res.status(400).json({ 
        message: `Bid amount must be between $${project.budget.min} and $${project.budget.max}` 
      });
    }

    const bid = new Bid({
      project: projectId,
      freelancer: req.user._id,
      amount,
      proposal,
      timeline,
      message: message || ''
    });

    await bid.save();

    // Populate freelancer info for response
    await bid.populate('freelancer', 'name email rating totalReviews');

    res.status(201).json({
      message: 'Bid submitted successfully',
      bid
    });

  } catch (error) {
    console.error('Create bid error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/bids/project/:projectId
// @desc    Get all bids for a project
// @access  Private (Project owner only)
router.get('/project/:projectId', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user is the project owner
    if (project.client.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view bids for this project' });
    }

    const bids = await Bid.find({ project: req.params.projectId })
      .populate('freelancer', 'name email rating totalReviews bio skills hourlyRate')
      .sort({ createdAt: -1 });

    res.json({ bids });

  } catch (error) {
    console.error('Get project bids error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/bids/my-bids
// @desc    Get current user's bids
// @access  Private
router.get('/my-bids', auth, async (req, res) => {
  try {
    const bids = await Bid.find({ freelancer: req.user._id })
      .populate('project', 'title description budget status')
      .sort({ createdAt: -1 });

    res.json({ bids });

  } catch (error) {
    console.error('Get user bids error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/bids/:id/accept
// @desc    Accept a bid
// @access  Private (Project owner only)
router.put('/:id/accept', auth, async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.id).populate('project');

    if (!bid) {
      return res.status(404).json({ message: 'Bid not found' });
    }

    // Check if user is the project owner
    if (bid.project.client.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to accept this bid' });
    }

    // Check if project is still open
    if (bid.project.status !== 'open') {
      return res.status(400).json({ message: 'Project is not accepting bids' });
    }

    // Update bid status
    bid.status = 'accepted';
    bid.isAccepted = true;
    bid.acceptedAt = new Date();
    await bid.save();

    // Update project status
    bid.project.status = 'in-progress';
    await bid.project.save();

    // Reject all other bids for this project
    await Bid.updateMany(
      { 
        project: bid.project._id, 
        _id: { $ne: bid._id } 
      },
      { status: 'rejected' }
    );

    res.json({
      message: 'Bid accepted successfully',
      bid
    });

  } catch (error) {
    console.error('Accept bid error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/bids/:id/reject
// @desc    Reject a bid
// @access  Private (Project owner only)
router.put('/:id/reject', auth, async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.id).populate('project');

    if (!bid) {
      return res.status(404).json({ message: 'Bid not found' });
    }

    // Check if user is the project owner
    if (bid.project.client.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to reject this bid' });
    }

    bid.status = 'rejected';
    await bid.save();

    res.json({
      message: 'Bid rejected successfully',
      bid
    });

  } catch (error) {
    console.error('Reject bid error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/bids/:id
// @desc    Withdraw a bid
// @access  Private (Bid owner only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.id);

    if (!bid) {
      return res.status(404).json({ message: 'Bid not found' });
    }

    // Check if user is the bid owner
    if (bid.freelancer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to withdraw this bid' });
    }

    // Check if bid can be withdrawn
    if (bid.status !== 'pending') {
      return res.status(400).json({ message: 'Bid cannot be withdrawn' });
    }

    await bid.remove();

    res.json({ message: 'Bid withdrawn successfully' });

  } catch (error) {
    console.error('Withdraw bid error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 