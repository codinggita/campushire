const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  appliedDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "pending",
  }
});

// Prevent duplicate applications
ApplicationSchema.index({ userId: 1, jobId: 1 }, { unique: true });

module.exports = mongoose.model('Application', ApplicationSchema);
