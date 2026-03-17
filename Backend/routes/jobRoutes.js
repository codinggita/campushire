const express = require('express');
const router = express.Router();
const { getJobs, getJobById, applyJob, getUserApplications, getSavedJobs } = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/jobs
// @desc    Get all jobs
// @access  Public
router.get('/jobs', getJobs);

// @route   GET /api/jobs/:id
// @desc    Get single job by ID
// @access  Public
router.get('/jobs/:id', getJobById);

// @route   POST /api/applications
// @desc    Apply for a job
// @access  Public
router.post('/applications', applyJob);

// @route   GET /api/applications/user/:id
// @desc    Get user applications
// @access  Private
router.get('/applications/user/:id', protect, getUserApplications);

// @route   GET /api/saved-jobs/:userId
// @desc    Get saved jobs
// @access  Private
router.get('/saved-jobs/:userId', protect, getSavedJobs);

module.exports = router;
