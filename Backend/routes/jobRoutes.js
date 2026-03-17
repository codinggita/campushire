const express = require('express');
const router = express.Router();
const { getJobs, applyJob } = require('../controllers/jobController');

// @route   GET /api/jobs
// @desc    Get all jobs
// @access  Public
router.get('/jobs', getJobs);

// @route   POST /api/applications
// @desc    Apply for a job
// @access  Public
router.post('/applications', applyJob);

module.exports = router;
