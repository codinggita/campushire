const Job = require('../models/Job');
const User = require('../models/User');
const Application = require('../models/Application');

// @desc    Get all jobs (with search, filter, and pagination)
// @route   GET /api/jobs
// @access  Public
exports.getJobs = async (req, res) => {
  try {
    const { 
      search, 
      jobType, 
      location, 
      minSalary, 
      maxSalary, 
      minExp, 
      maxExp, 
      page = 1, 
      limit = 10 
    } = req.query;

    let query = {};

    // Search by title, company, or skills
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { skills: { $regex: search, $options: 'i' } },
      ];
    }

    // Filter by jobType
    if (jobType) {
      query.jobType = { $regex: new RegExp(`^${jobType}$`, 'i') };
    }

    // Filter by location
    if (location) {
      query.location = { $regex: new RegExp(`^${location}$`, 'i') };
    }

    // Salary Range Filter
    if (minSalary || maxSalary) {
      query.salary = {};
      if (minSalary) query.salary.$gte = Number(minSalary);
      if (maxSalary) query.salary.$lte = Number(maxSalary);
    }

    // Experience Range Filter
    if (minExp || maxExp) {
      query.experience = {};
      if (minExp) query.experience.$gte = Number(minExp);
      if (maxExp) query.experience.$lte = Number(maxExp);
    }

    // Pagination basics
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    if (isNaN(pageNum) || isNaN(limitNum)) {
      return res.status(400).json({ error: 'Invalid query parameters for pagination' });
    }
    const startIndex = (pageNum - 1) * limitNum;

    const totalJobs = await Job.countDocuments(query);
    const jobs = await Job.find(query)
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limitNum);

    if (jobs.length === 0) {
      return res.status(404).json({ message: 'No jobs found in selected range' });
    }

    res.status(200).json({
      success: true,
      jobs: jobs,
      totalJobs: totalJobs,
      currentPage: pageNum,
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Server error fetching jobs' });
  }
};

// @desc    Apply for a job
// @route   POST /api/applications
// @access  Public (should realistically be protected by auth middleware, left public according to prompt example)
exports.applyJob = async (req, res) => {
  try {
    const { userId, jobId } = req.body;

    if (!userId || !jobId) {
      return res.status(400).json({ error: 'Please provide both userId and jobId' });
    }

    // 1. Check User exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ error: 'User does not exist' });
    }

    // 2. Check Job exists
    const jobExists = await Job.findById(jobId);
    if (!jobExists) {
      return res.status(404).json({ error: 'Job does not exist' });
    }

    // 3. Prevent duplicate applications
    const existingApplication = await Application.findOne({ userId, jobId });
    if (existingApplication) {
      return res.status(400).json({ error: 'You have already applied for this job' });
    }

    // Create Application
    const newApp = await Application.create({
      userId,
      jobId,
    });

    res.status(201).json({
      success: true,
      message: 'Application successful',
      data: newApp,
    });

  } catch (error) {
    console.error('Error applying for job:', error);
    if (error.code === 11000) {
      // MongoDB duplicate key error index fallback
      return res.status(400).json({ error: 'You have already applied for this job' });
    }
    res.status(500).json({ error: 'Server error processing application' });
  }
};
