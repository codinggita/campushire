import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import BackButton from '../components/BackButton';

const StudentDashboard = ({ user, navigate }) => {
  return (
    <>
      {/* Welcome Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
          Welcome to your <span className="text-yellow-400">Dashboard</span>
        </h1>
        <p className="text-lg text-gray-400">
          {user.name} ({user.role?.toUpperCase()})
        </p>
        <p className="text-sm text-gray-500 mt-1">{user.email}</p>
      </div>

      {/* Dashboard Cards Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Applied Jobs Card */}
        <div className="bg-[#1A1625] border border-purple-900 hover:border-purple-600 transition-colors rounded-xl p-6 shadow-lg shadow-black/20 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-purple-900/50 text-purple-400 rounded-full flex items-center justify-center mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Applied Jobs</h3>
          <p className="text-gray-400 text-sm mb-4">You have 12 applied jobs.</p>
          <button 
            onClick={() => navigate('/jobs')}
            className="mt-auto px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-white font-medium transition-colors w-full"
          >
            View Applications
          </button>
        </div>

        {/* Saved Jobs Card */}
        <div className="bg-[#1A1625] border border-purple-900 hover:border-purple-600 transition-colors rounded-xl p-6 shadow-lg shadow-black/20 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-yellow-400/20 text-yellow-400 rounded-full flex items-center justify-center mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Saved Jobs</h3>
          <p className="text-gray-400 text-sm mb-4">You have 5 saved jobs.</p>
            <button 
            onClick={() => navigate('/jobs')}
            className="mt-auto px-4 py-2 border border-purple-700 hover:bg-purple-900/40 rounded-lg text-white font-medium transition-colors w-full"
          >
            View Saved Jobs
          </button>
        </div>

        {/* Upcoming Interviews Card */}
        <div className="bg-[#1A1625] border border-purple-900 hover:border-purple-600 transition-colors rounded-xl p-6 shadow-lg shadow-black/20 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Upcoming Interviews</h3>
          <p className="text-gray-400 text-sm mb-4">2 interviews scheduled.</p>
          <button className="mt-auto px-4 py-2 border border-purple-700 hover:bg-purple-900/40 rounded-lg text-white font-medium transition-colors w-full">
            View Schedule
          </button>
        </div>

        {/* Profile Completion Card */}
        <div className="bg-[#1A1625] border border-purple-900 hover:border-purple-600 transition-colors rounded-xl p-6 shadow-lg shadow-black/20 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Profile Completion</h3>
          <div className="w-full bg-[#0F0B1A] rounded-full h-2.5 mb-2 mt-2">
            <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: '65%' }}></div>
          </div>
          <p className="text-gray-400 text-sm mb-2 text-left w-full">65% Completed</p>
          <button className="mt-auto px-4 py-2 border border-purple-700 hover:bg-purple-900/40 rounded-lg text-white font-medium transition-colors w-full">
            Update Profile
          </button>
        </div>
      </div>
    </>
  );
};

const CompanyDashboard = ({ user, navigate }) => {
  return (
    <>
      {/* Welcome Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
          Welcome <span className="text-yellow-400">Company Dashboard</span>
        </h1>
        <p className="text-lg text-gray-400">
          {user.name} ({user.role?.toUpperCase()})
        </p>
        <p className="text-sm text-gray-500 mt-1">{user.email}</p>
      </div>

      {/* Dashboard Cards Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Posted Jobs Card */}
        <div className="bg-[#1A1625] border border-purple-900 hover:border-purple-600 transition-colors rounded-xl p-6 shadow-lg shadow-black/20 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-purple-900/50 text-purple-400 rounded-full flex items-center justify-center mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Posted Jobs</h3>
          <p className="text-gray-400 text-sm mb-4">You have 8 total jobs posted.</p>
          <button 
            className="mt-auto px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-white font-medium transition-colors w-full"
          >
            Post New Job
          </button>
        </div>

        {/* Applications Received Card */}
        <div className="bg-[#1A1625] border border-purple-900 hover:border-purple-600 transition-colors rounded-xl p-6 shadow-lg shadow-black/20 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-yellow-400/20 text-yellow-400 rounded-full flex items-center justify-center mb-4">
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Applications Received</h3>
          <p className="text-gray-400 text-sm mb-4">150 total applicants.</p>
            <button 
            className="mt-auto px-4 py-2 border border-purple-700 hover:bg-purple-900/40 rounded-lg text-white font-medium transition-colors w-full"
          >
            View Applicants
          </button>
        </div>

        {/* Manage Job Posts Card */}
        <div className="bg-[#1A1625] border border-purple-900 hover:border-purple-600 transition-colors rounded-xl p-6 shadow-lg shadow-black/20 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-4">
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Manage Job Posts</h3>
          <p className="text-gray-400 text-sm mb-4">5 active listings.</p>
          <button className="mt-auto px-4 py-2 border border-purple-700 hover:bg-purple-900/40 rounded-lg text-white font-medium transition-colors w-full">
            Manage Listings
          </button>
        </div>

        {/* Candidate List Card */}
        <div className="bg-[#1A1625] border border-purple-900 hover:border-purple-600 transition-colors rounded-xl p-6 shadow-lg shadow-black/20 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Candidate List</h3>
          <p className="text-gray-400 text-sm mb-4">Browse and review shortlisted candidates.</p>
          <button className="mt-auto px-4 py-2 border border-purple-700 hover:bg-purple-900/40 rounded-lg text-white font-medium transition-colors w-full">
            View Candidates
          </button>
        </div>
      </div>
    </>
  );
};

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Or a loading spinner, but returning null prevents flash before redirect
  }

  return (
    <div className="min-h-screen bg-[#0F0B1A] flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 text-white font-sans">
      <div className="max-w-6xl w-full">
        <BackButton />
        {user.role === 'student' ? (
          <StudentDashboard user={user} navigate={navigate} />
        ) : (
          <CompanyDashboard user={user} navigate={navigate} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
