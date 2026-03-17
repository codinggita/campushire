const Job = require('../models/Job');
const User = require('../models/User');
const Application = require('../models/Application');

// @desc    Get all jobs (with search, filter, and pagination)
// @route   GET /api/jobs
// @access  Public
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.json({ success: true, job });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ error: "Job not found" });
    }
    console.error('Error fetching job details:', error);
    res.status(500).json({ error: "Server error fetching job details" });
  }
};

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

    // 1. Check if user already applied
    const existingApplication = await Application.findOne({ userId, jobId });
    if (existingApplication) {
      return res.status(400).json({ error: "Already applied" });
    }

    // Save new application
    const newApplication = new Application({
      userId,
      jobId,
      appliedDate: new Date(),
      status: "pending"
    });
    await newApplication.save();

    res.json({
      success: true,
      message: "Application submitted successfully"
    });

    } catch (error) {
    console.error('Error applying for job:', error);
    if (error.code === 11000) {
      return res.status(400).json({ error: "Already applied" });
    }
    res.status(500).json({ error: 'Server error processing application' });
  }
};

exports.getUserApplications = async (req, res) => {
  try {
    const userId = req.user._id;
    const applications = await Application.find({ userId }).populate('jobId');
    
    // Simulate formatting as requested
    const appliedJobs = applications.map(app => app.jobId);
    const interviews = []; // Mock
    const status = applications.map(app => app.status); // Mock status
    
    res.json({ appliedJobs, interviews, status });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Company Specific Endpoints
exports.getCompanyJobs = async (req, res) => {
  try {
    const companyId = req.user._id;
    const postedJobs = await Job.find({ companyId });
    res.json({ postedJobs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error fetching company jobs' });
  }
};

exports.getCompanyApplications = async (req, res) => {
  try {
    const companyId = req.user._id;
    const companyJobs = await Job.find({ companyId }).select('_id');
    const jobIds = companyJobs.map(job => job._id);
    
    const applications = await Application.find({ jobId: { $in: jobIds } })
      .populate('userId', 'name email skills')
      .populate('jobId', 'title');
      
    res.json({ applications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error fetching company applications' });
  }
};

exports.getSavedJobs = async (req, res) => {
  try {
    // Missing saved job schema for now, returning empty array
    res.json({ success: true, savedJobs: [] });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
