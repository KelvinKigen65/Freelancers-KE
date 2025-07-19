const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Client is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['web-development', 'mobile-development', 'design', 'writing', 'marketing', 'other']
  },
  skills: [{
    type: String,
    trim: true
  }],
  budget: {
    min: {
      type: Number,
      required: [true, 'Minimum budget is required']
    },
    max: {
      type: Number,
      required: [true, 'Maximum budget is required']
    }
  },
  deadline: {
    type: Date
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'completed', 'cancelled'],
    default: 'open'
  },
  location: {
    type: String,
    default: 'Remote'
  },
  attachments: [{
    filename: String,
    url: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  views: {
    type: Number,
    default: 0
  },
  bids: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for search functionality
projectSchema.index({ title: 'text', description: 'text', skills: 'text' });

// Virtual for budget range
projectSchema.virtual('budgetRange').get(function() {
  return `$${this.budget.min} - $${this.budget.max}`;
});

// Ensure virtual fields are serialized
projectSchema.set('toJSON', { virtuals: true });

// Add pagination plugin
projectSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Project', projectSchema); 