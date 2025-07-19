const express = require('express');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get current user's profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
  try {
    res.json({ user: req.user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/users/profile
// @desc    Update current user's profile
// @access  Private
router.put('/profile', auth, async (req, res) => {
  try {
    const {
      name,
      bio,
      skills,
      hourlyRate,
      location,
      website
    } = req.body;

    const user = await User.findById(req.user._id);

    // Update fields
    if (name) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (skills) user.skills = skills.split(',').map(skill => skill.trim());
    if (hourlyRate !== undefined) user.hourlyRate = hourlyRate;
    if (location !== undefined) user.location = location;
    if (website !== undefined) user.website = website;

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/:id
// @desc    Get user by ID (public profile)
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('name bio skills hourlyRate location website avatar rating totalReviews userType createdAt');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.isActive) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/search/freelancers
// @desc    Search freelancers
// @access  Public
router.get('/search/freelancers', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      skills,
      minRate,
      maxRate,
      location
    } = req.query;

    const query = {
      userType: 'freelancer',
      isActive: true
    };

    // Skills filter
    if (skills) {
      const skillArray = skills.split(',').map(skill => skill.trim());
      query.skills = { $in: skillArray };
    }

    // Hourly rate filter
    if (minRate || maxRate) {
      query.hourlyRate = {};
      if (minRate) query.hourlyRate.$gte = parseInt(minRate);
      if (maxRate) query.hourlyRate.$lte = parseInt(maxRate);
    }

    // Location filter
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      select: 'name bio skills hourlyRate location website avatar rating totalReviews',
      sort: { rating: -1, totalReviews: -1 }
    };

    const freelancers = await User.paginate(query, options);

    res.json(freelancers);

  } catch (error) {
    console.error('Search freelancers error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/users/avatar
// @desc    Update user avatar
// @access  Private
router.put('/avatar', auth, async (req, res) => {
  try {
    const { avatar } = req.body;

    if (!avatar) {
      return res.status(400).json({ message: 'Avatar URL is required' });
    }

    const user = await User.findById(req.user._id);
    user.avatar = avatar;
    await user.save();

    res.json({
      message: 'Avatar updated successfully',
      avatar: user.avatar
    });

  } catch (error) {
    console.error('Update avatar error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/users/profile
// @desc    Deactivate user account
// @access  Private
router.delete('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.isActive = false;
    await user.save();

    res.json({ message: 'Account deactivated successfully' });

  } catch (error) {
    console.error('Deactivate account error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 