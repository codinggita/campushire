import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { mockJobs } from './Jobs';
import BackButton from '../components/BackButton';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [job, setJob] = useState(null);
  const [isApplied, setIsApplied] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch job data
  useEffect(() => {
    // Simulating an API call to fetch job details
    const fetchJob = () => {
      const foundJob = mockJobs.find((j) => j.id === parseInt(id));
      if (foundJob) {
        // Mocking skills required as it wasn't in mockJobs initially
        const jobWithSkills = {
          ...foundJob,
          skills: ['React', 'JavaScript', 'Tailwind CSS', 'Node.js']
        };
        setJob(jobWithSkills);
      }
      setLoading(false);
    };
    
    fetchJob();
  }, [id]);

  const handleApply = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/applications', {
        userId: user._id || user.id,
        jobId: job.id
      });
      alert("Application submitted successfully");
      setIsApplied(true);
    } catch (error) {
      alert(error.response?.data?.error || "Error applying");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 bg-[#0F0B1A] flex items-center justify-center">
        <div className="text-white text-xl">Loading job details...</div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen pt-24 pb-12 bg-[#0F0B1A] flex items-center justify-center flex-col">
        <h2 className="text-2xl font-bold text-white mb-4">Job not found</h2>
        <button onClick={() => navigate('/jobs')} className="text-purple-400 hover:text-purple-300">
          Back to Jobs List
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0B1A] pt-24 pb-12 px-4 sm:px-6 lg:px-8 text-white font-sans">
      <div className="max-w-4xl mx-auto">
        <BackButton />

        <div className="bg-[#1A1625] border border-purple-900 rounded-2xl p-8 md:p-10 shadow-xl shadow-black/20">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8 border-b border-purple-900/50 pb-8">
            <div className="flex items-start gap-5">
              <div className="w-16 h-16 bg-[#0F0B1A] border border-purple-800 rounded-xl flex items-center justify-center text-3xl font-bold text-yellow-400 flex-shrink-0">
                {job.logo || job.company.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-2">{job.title}</h1>
                <div className="text-xl text-gray-300">{job.company}</div>
              </div>
            </div>
            
            <div className="flex-shrink-0">
               <button 
                  onClick={handleApply}
                  disabled={isApplied}
                  className={`w-full md:w-auto font-bold px-8 py-3.5 rounded-lg transition-colors text-center shadow-lg ${
                    isApplied 
                      ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                      : 'bg-yellow-400 hover:bg-yellow-300 text-black shadow-yellow-400/20'
                  }`}
                >
                  {isApplied ? 'Applied' : 'Apply Now'}
                </button>
            </div>
          </div>

          {/* Key Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="bg-[#0F0B1A] border border-purple-900/50 rounded-xl p-4">
              <div className="text-gray-400 text-sm mb-1">Location</div>
              <div className="font-semibold text-white">{job.location}</div>
            </div>
            <div className="bg-[#0F0B1A] border border-purple-900/50 rounded-xl p-4">
              <div className="text-gray-400 text-sm mb-1">Job Type</div>
              <div className="font-semibold text-white">{job.type}</div>
            </div>
            <div className="bg-[#0F0B1A] border border-purple-900/50 rounded-xl p-4">
              <div className="text-gray-400 text-sm mb-1">Salary</div>
              <div className="font-semibold text-green-400">{new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(job.salary)}</div>
            </div>
            <div className="bg-[#0F0B1A] border border-purple-900/50 rounded-xl p-4">
              <div className="text-gray-400 text-sm mb-1">Experience</div>
              <div className="font-semibold text-white">{job.experience} {job.experience === 1 ? 'Year' : 'Years'}</div>
            </div>
          </div>

          {/* Full Description */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              Job Description
            </h3>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>{job.description}</p>
              <p>We are looking for dedicated candidates to join our team. If you are passionate about building meaningful products and thrive in collaborative environments, this could be the perfect opportunity for you.</p>
            </div>
          </div>

          {/* Skills Required */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Skills Required</h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <span key={index} className="px-4 py-2 bg-purple-900/30 border border-purple-700/50 text-purple-300 rounded-lg text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default JobDetails;
