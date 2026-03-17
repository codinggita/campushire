import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import BackButton from '../components/BackButton';
import { mockJobs } from './Jobs';

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const fetchSavedJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/saved-jobs', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.savedJobs && res.data.savedJobs.length > 0) {
           setSavedJobs(res.data.savedJobs);
        } else {
           setSavedJobs([]);
        }
      } catch (error) {
        console.error("Failed to fetch saved jobs");
        setSavedJobs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSavedJobs();
  }, [user, navigate]);

  if (loading) {
     return <div className="min-h-screen pt-24 pb-12 bg-[#0F0B1A] flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0F0B1A] pt-24 pb-12 px-4 sm:px-6 lg:px-8 text-white font-sans">
      <div className="max-w-4xl mx-auto">
        <BackButton />
        <div className="mb-8 items-center flex gap-3">
            <svg className="w-8 h-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <h1 className="text-3xl font-extrabold text-white">Saved <span className="text-purple-400">Jobs</span></h1>
        </div>

        <div className="space-y-6">
          {savedJobs.length > 0 ? (
            savedJobs.map((job) => (
               <div key={job.id || job._id} className="bg-[#1A1625] border border-purple-900 hover:border-purple-600 transition-colors rounded-xl p-6 shadow-lg shadow-black/20 group">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    
                    {/* Job Header & Info */}
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-[#0F0B1A] border border-purple-800 rounded-lg flex items-center justify-center text-xl font-bold text-yellow-400 flex-shrink-0">
                        {job.logo || "C"}
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
                            {job.location || 'Remote'}
                          </span>
                          <span className="flex items-center text-sm text-gray-400 bg-[#0F0B1A] px-3 py-1 rounded-full border border-purple-900/50">
                            <svg className="w-4 h-4 mr-1.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(job.salary || 65000)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3 ml-18 md:ml-0 md:min-w-[140px]">
                      <button 
                        onClick={() => navigate(`/jobs/${job.id || job._id}`)}
                        className="flex-1 font-semibold px-4 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-black rounded-lg transition-colors text-center shadow-lg shadow-yellow-400/20"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
            ))
          ) : (
             <div className="bg-[#1A1625] border border-purple-900 rounded-xl p-12 text-center shadow-lg">
                <svg className="w-16 h-16 mx-auto text-yellow-400/50 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                <h3 className="text-xl font-bold text-white mb-2">No saved jobs yet</h3>
                <p className="text-gray-400">Save a few jobs to view them here.</p>
                <button 
                  onClick={() => navigate('/jobs')}
                  className="mt-6 px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-lg transition-colors border border-purple-500"
                >
                  Browse Jobs
                </button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedJobs;
