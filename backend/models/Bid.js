const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: [true, 'Project is required']
  },
  freelancer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Freelancer is required']
  },
  amount: {
    type: Number,
    required: [true, 'Bid amount is required'],
    min: [1, 'Bid amount must be greater than 0']
  },
  proposal: {
    type: String,
    required: [true, 'Proposal is required'],
    trim: true
  },
  timeline: {
    type: Number,
    required: [true, 'Timeline is required'],
    min: [1, 'Timeline must be at least 1 day']
  },
  message: {
    type: String,
    trim: true,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'withdrawn'],
    default: 'pending'
  },
  isAccepted: {
    type: Boolean,
    default: false
  },
  acceptedAt: {
    type: Date
  },
  clientFeedback: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      trim: true
    },
    createdAt: {
      type: Date
    }
  }
}, {
  timestamps: true
});

// Ensure one bid per freelancer per project
bidSchema.index({ project: 1, freelancer: 1 }, { unique: true });

// Update project bid count when bid is created
bidSchema.post('save', async function(doc) {
  const Project = mongoose.model('Project');
  await Project.findByIdAndUpdate(doc.project, { $inc: { bids: 1 } });
});

// Update project bid count when bid is deleted
bidSchema.post('remove', async function(doc) {
  const Project = mongoose.model('Project');
  await Project.findByIdAndUpdate(doc.project, { $inc: { bids: -1 } });
});

module.exports = mongoose.model('Bid', bidSchema); 