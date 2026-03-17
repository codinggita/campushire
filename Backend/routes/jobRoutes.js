const express = require('express');
const router = express.Router();
const { getJobs, getJobById, applyJob, getUserApplications, getCompanyJobs, getCompanyApplications, getSavedJobs } = require('../controllers/jobController');
const { protect, isStudent, isCompany } = require('../middleware/authMiddleware');

// Public
router.get('/jobs', getJobs);
router.get('/jobs/:id', getJobById);
router.post('/applications', applyJob); 

// Student Role Dashboard
router.get('/applications/user/', protect, isStudent, getUserApplications);

// Company Role Dashboard
router.get('/jobs/company/', protect, isCompany, getCompanyJobs);
router.get('/applications/company/', protect, isCompany, getCompanyApplications);

// Extras
router.get('/saved-jobs/:userId', protect, getSavedJobs);

module.exports = router;
