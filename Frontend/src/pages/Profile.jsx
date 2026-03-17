import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import BackButton from '../components/BackButton';

function getInitials(name) {
  if (!name) return "";
  const words = name.trim().split(" ");
  if (words.length === 1) return words[0][0].toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0F0B1A] pt-24 pb-12 px-4 sm:px-6 lg:px-8 text-white font-sans">
      <div className="max-w-3xl mx-auto">
        <BackButton />
        
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Your <span className="text-purple-400">Profile</span>
          </h1>
          <p className="text-gray-400 text-lg">Manage your personal information and preferences.</p>
        </div>

        {/* Profile Card */}
        <div className="bg-[#1A1625] border border-purple-900 rounded-2xl p-8 shadow-xl shadow-black/20">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 border-b border-purple-900/50 pb-8 mb-8">
            <div className="w-24 h-24 bg-purple-900/50 text-purple-400 border border-purple-700 rounded-full flex flex-shrink-0 items-center justify-center text-4xl font-bold uppercase overflow-hidden">
               {getInitials(user.name)}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-white mb-1">{user.name}</h2>
              <div className="text-purple-400 font-medium tracking-wide text-sm uppercase mb-3 bg-purple-900/30 inline-block px-3 py-1 rounded-full border border-purple-700/50">
                {user.role}
              </div>
              <p className="text-gray-400 flex items-center justify-center md:justify-start">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {user.email}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-2">Account Type</h3>
              <p className="text-white text-lg capitalize">{user.role} Account</p>
            </div>
            
            <div>
              <h3 className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-2">
                {user.role === 'student' ? 'Skills' : 'Company Name'}
              </h3>
              <p className="text-white text-lg">
                {user.skills ? user.skills : user.companyName ? user.companyName : "Not specified"}
              </p>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-purple-900/50">
            <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-6 py-2.5 rounded-lg transition-colors shadow-lg shadow-yellow-400/20">
              Edit Profile
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
