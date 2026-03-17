import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function getInitials(name) {
  if (!name) return "";
  const words = name.trim().split(" ");
  if (words.length === 1) return words[0][0].toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <nav className="bg-[#0F0B1A]/80 backdrop-blur-md border-b border-purple-900/80 fixed w-full top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Left: Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2 group">
              <span className="bg-yellow-400 text-black px-2 py-0.5 rounded-md text-xl group-hover:bg-yellow-300 transition-colors">C</span>
              Campus<span className="text-gray-400">Hire</span>
            </Link>
          </div>

          {/* Center navigation */}
          {user && (
            <div className="hidden md:flex items-center space-x-10">
              <Link to="/" className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200">Home</Link>
              <Link to="/jobs" className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200">Jobs</Link>
              <Link to="/companies" className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200">Companies</Link>
              <Link to="/dashboard" className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200">Dashboard</Link>
            </div>
          )}

          {/* Right: Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/profile" className="flex items-center text-sm mr-4 hidden sm:flex cursor-pointer">
                  {/* Avatar */}
                  <div className="ml-2 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-sm border border-purple-400 hover:bg-purple-500 transition-colors">
                    {getInitials(user.name)}
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="border border-purple-700 hover:bg-purple-900/30 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              location.pathname !== '/login' && location.pathname !== '/signup' && (
                <>
                  <Link
                    to="/login"
                    className="border border-purple-700 text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-purple-900/30 transition-all duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-yellow-400 hover:bg-yellow-300 text-black text-sm font-bold px-5 py-2 rounded-lg transition-all duration-300"
                  >
                    Sign Up
                  </Link>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
