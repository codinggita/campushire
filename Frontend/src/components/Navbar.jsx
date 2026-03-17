import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

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
          <div className="hidden md:flex items-center space-x-10">
            <Link to="/" className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200">Home</Link>
            <Link to="/jobs" className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200">Jobs</Link>
            <Link to="/companies" className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200">Companies</Link>
            <Link to="/students" className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200">Students</Link>
            <Link to="/about" className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200">About</Link>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center text-sm mr-2 hidden sm:flex">
                  <span className="text-gray-400 mr-1">Hello,</span>
                  <span className="text-white font-medium">{user.name}</span>
                  <span className="text-purple-400 uppercase text-xs ml-1 font-bold">({user.role})</span>
                </div>
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
