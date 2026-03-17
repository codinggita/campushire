import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export const mockJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechNova Inc.",
    logo: "T",
    location: "Remote",
    type: "Full Time",
    experience: 3,
    salary: 75000,
    description: "We are looking for a skilled Frontend Developer with expertise in React and Tailwind CSS to build cutting-edge web applications."
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "DataSync Corp",
    logo: "D",
    location: "On-site",
    type: "Full Time",
    experience: 5,
    salary: 110000,
    description: "Join our core team to scale our Node.js and MongoDB infrastructure. Experience with distributed systems preferred."
  },
  {
    id: 3,
    title: "UI/UX Designer Intern",
    company: "Creative Studio",
    logo: "C",
    location: "Hybrid",
    type: "Internship",
    experience: 0,
    salary: 35000,
    description: "Help design the next generation of our product interfaces. Looking for strong visual design skills and Figma expertise."
  },
  {
    id: 4,
    title: "Data Analyst",
    company: "Metrics Cloud",
    logo: "M",
    location: "Remote",
    type: "Part Time",
    experience: 1,
    salary: 45000,
    description: "Part-time data analyst responsible for building automated dashboards and writing complex SQL queries."
  }
];

const Jobs = () => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJobType, setSelectedJobType] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  
  // Range States
  const [salaryRange, setSalaryRange] = useState({ min: 0, max: 200000 });
  const [experienceRange, setExperienceRange] = useState({ min: 0, max: 10 });

  const handleCheckboxChange = (setter, value) => {
    setter(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value) 
        : [...prev, value]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedJobType([]);
    setSelectedLocation([]);
    setSalaryRange({ min: 0, max: 200000 });
    setExperienceRange({ min: 0, max: 10 });
  };

  // Filter Logic
  const filteredJobs = mockJobs.filter(job => {
    const searchMatch = !searchQuery || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());

    const typeMatch = selectedJobType.length === 0 || selectedJobType.includes(job.type);
    const locationMatch = selectedLocation.length === 0 || selectedLocation.includes(job.location);
    
    // Range Matching
    const salaryMatch = job.salary >= salaryRange.min && job.salary <= salaryRange.max;
    const expMatch = job.experience >= experienceRange.min && job.experience <= experienceRange.max;

    return searchMatch && typeMatch && locationMatch && salaryMatch && expMatch;
  });

  const handleApply = async (jobId) => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      // POST /api/applications is the required format from the prompt. We use the full URL if needed, but since we are using axios maybe just 'http://localhost:5000/api/applications'
      await axios.post('http://localhost:5000/api/applications', {
        userId: user._id || user.id, // Depending on backend. Usually user._id.
        jobId: jobId
      });
      alert("Application submitted successfully");
      setAppliedJobs(prev => [...prev, jobId]);
    } catch (error) {
      alert("Application failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0B1A] pt-24 pb-12 px-4 sm:px-6 lg:px-8 text-white font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="mb-10 text-center lg:text-left">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-white">Find Your Next <span className="text-purple-400">Opportunity</span></h1>
          <p className="text-gray-400 text-lg md:text-xl">Explore internships and jobs posted by companies on CampusHire.</p>
        </div>

        {/* Search Bar */}
        <div className="mb-10">
          <div className="relative max-w-4xl mx-auto lg:mx-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1A1625] border border-purple-900 rounded-lg pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Search jobs by title, company, or skills"
            />
          </div>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-6 flex justify-end">
          <button 
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="flex items-center space-x-2 bg-[#1A1625] border border-purple-900 px-4 py-2 rounded-lg text-gray-300 hover:text-white transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span>Filters</span>
          </button>
        </div>

        {/* Main Content Layout */}
        <div className="lg:grid lg:grid-cols-4 gap-8">
          
          {/* Filters Panel */}
          <div className={`lg:block ${isFiltersOpen ? 'block' : 'hidden'} lg:col-span-1 space-y-6`}>
            <div className="bg-[#1A1625] border border-purple-900 rounded-xl p-6 sticky top-28">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Filters</h3>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={clearFilters}
                    className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Reset Filters
                  </button>
                  {isFiltersOpen && (
                    <button onClick={() => setIsFiltersOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Job Type */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-300 mb-3">Job Type</h4>
                <div className="space-y-2">
                  {['Full Time', 'Part Time', 'Internship'].map((type) => (
                    <label key={type} className="flex items-center space-x-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center w-5 h-5">
                        <input 
                          type="checkbox" 
                          checked={selectedJobType.includes(type)}
                          onChange={() => handleCheckboxChange(setSelectedJobType, type)}
                          className="peer appearance-none w-5 h-5 border border-purple-900 rounded bg-[#0F0B1A] checked:bg-purple-600 checked:border-purple-600 transition-colors cursor-pointer" 
                        />
                        <svg className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-400 group-hover:text-white transition-colors">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-300 mb-3">Location</h4>
                <div className="space-y-2">
                  {['Remote', 'On-site', 'Hybrid'].map((loc) => (
                    <label key={loc} className="flex items-center space-x-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center w-5 h-5">
                        <input 
                          type="checkbox" 
                          checked={selectedLocation.includes(loc)}
                          onChange={() => handleCheckboxChange(setSelectedLocation, loc)}
                          className="peer appearance-none w-5 h-5 border border-purple-900 rounded bg-[#0F0B1A] checked:bg-purple-600 checked:border-purple-600 transition-colors cursor-pointer" 
                        />
                        <svg className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-400 group-hover:text-white transition-colors">{loc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Salary Range */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-300 mb-3">Salary Range</h4>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-400">$</span>
                    <input 
                      type="number"
                      value={salaryRange.min}
                      onChange={(e) => setSalaryRange({ ...salaryRange, min: Number(e.target.value) })}
                      className="w-full bg-[#0F0B1A] border border-purple-900 rounded-lg pl-6 pr-2 py-2 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="Min"
                    />
                  </div>
                  <span className="text-gray-500">—</span>
                  <div className="flex-1 relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-400">$</span>
                    <input 
                      type="number"
                      value={salaryRange.max}
                      onChange={(e) => setSalaryRange({ ...salaryRange, max: Number(e.target.value) })}
                      className="w-full bg-[#0F0B1A] border border-purple-900 rounded-lg pl-6 pr-2 py-2 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="Max"
                    />
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-2 text-center">
                  Showing: ₹{salaryRange.min.toLocaleString('en-IN')} — ₹{salaryRange.max.toLocaleString('en-IN')}
                </div>
              </div>

              {/* Experience Range */}
              <div>
                <h4 className="font-semibold text-gray-300 mb-3">Experience (Years)</h4>
                <div className="flex items-center space-x-2">
                  <div className="flex-1">
                    <input 
                      type="number"
                      value={experienceRange.min}
                      onChange={(e) => setExperienceRange({ ...experienceRange, min: Number(e.target.value) })}
                      className="w-full bg-[#0F0B1A] border border-purple-900 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="Min Yrs"
                      min="0"
                    />
                  </div>
                  <span className="text-gray-500">—</span>
                  <div className="flex-1">
                    <input 
                      type="number"
                      value={experienceRange.max}
                      onChange={(e) => setExperienceRange({ ...experienceRange, max: Number(e.target.value) })}
                      className="w-full bg-[#0F0B1A] border border-purple-900 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="Max Yrs"
                      min="0"
                    />
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-2 text-center">
                  Showing: {experienceRange.min} — {experienceRange.max} years
                </div>
              </div>
              
            </div>
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-3 space-y-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div key={job.id} className="bg-[#1A1625] border border-purple-900 hover:border-purple-600 transition-colors rounded-xl p-6 shadow-lg shadow-black/20 group">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    
                    {/* Job Header & Info */}
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-[#0F0B1A] border border-purple-800 rounded-lg flex items-center justify-center text-xl font-bold text-yellow-400 flex-shrink-0">
                        {job.logo}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">{job.title}</h2>
                        <div className="text-lg text-gray-300 mt-1">{job.company}</div>
                        
                        <div className="flex flex-wrap gap-3 mt-3">
                          <span className="flex items-center text-sm text-gray-400 bg-[#0F0B1A] px-3 py-1 rounded-full border border-purple-900/50">
                            <svg className="w-4 h-4 mr-1.5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {job.location}
                          </span>
                          <span className="flex items-center text-sm text-gray-400 bg-[#0F0B1A] px-3 py-1 rounded-full border border-purple-900/50">
                            <svg className="w-4 h-4 mr-1.5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {job.type}
                          </span>
                          <span className="flex items-center text-sm text-gray-400 bg-[#0F0B1A] px-3 py-1 rounded-full border border-purple-900/50">
                            <svg className="w-4 h-4 mr-1.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(job.salary)}
                          </span>
                          <span className="flex items-center text-sm text-gray-400 bg-[#0F0B1A] px-3 py-1 rounded-full border border-purple-900/50">
                            <svg className="w-4 h-4 mr-1.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {job.experience} {job.experience === 1 ? 'Year' : 'Years'} Exp
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex md:flex-col gap-3 ml-18 md:ml-0 md:min-w-[140px]">
                      <button 
                        onClick={() => handleApply(job.id)}
                        disabled={appliedJobs.includes(job.id)}
                        className={`flex-1 md:flex-none font-semibold px-4 py-2.5 rounded-lg transition-colors text-center shadow-lg ${
                          appliedJobs.includes(job.id) 
                            ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                            : 'bg-yellow-400 hover:bg-yellow-300 text-black shadow-yellow-400/20'
                        }`}
                      >
                        {appliedJobs.includes(job.id) ? 'Applied' : 'Apply Now'}
                      </button>
                      <button 
                        onClick={() => navigate(`/jobs/${job.id}`)}
                        className="flex-1 md:flex-none border border-purple-700 hover:bg-purple-900/40 text-white px-4 py-2.5 rounded-lg transition-colors text-center"
                      >
                        View Details
                      </button>
                    </div>
                    
                  </div>

                  <div className="mt-5 ml-0 md:ml-18">
                    <p className="text-gray-400 leading-relaxed text-sm">
                      {job.description}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-[#1A1625] border border-purple-900 rounded-xl p-12 text-center shadow-lg">
                <svg className="w-16 h-16 mx-auto text-purple-900 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="text-xl font-bold text-white mb-2">No jobs found</h3>
                <p className="text-gray-400">Try adjusting your search or filters to find what you're looking for.</p>
                <button 
                  onClick={clearFilters}
                  className="mt-6 px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-lg transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {filteredJobs.length > 0 && (
              <div className="flex justify-center items-center mt-12 space-x-2">
                <button className="px-4 py-2 border border-purple-900 rounded-lg text-gray-400 hover:text-white hover:bg-[#1A1625] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  Previous
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-purple-600 text-white font-medium shadow-lg shadow-purple-600/30">
                  1
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-purple-900 text-gray-400 hover:text-white hover:border-purple-600 hover:bg-[#1A1625] transition-colors">
                  2
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-purple-900 text-gray-400 hover:text-white hover:border-purple-600 hover:bg-[#1A1625] transition-colors">
                  3
                </button>
                <span className="text-gray-500 px-2">...</span>
                <button className="px-4 py-2 border border-purple-900 rounded-lg text-gray-400 hover:text-white hover:bg-[#1A1625] transition-colors">
                  Next
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default Jobs;
