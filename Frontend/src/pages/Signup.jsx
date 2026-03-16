import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

const Signup = () => {
  const [accountType, setAccountType] = useState('student'); // 'student' or 'company'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [skills, setSkills] = useState('');
  const [companyName, setCompanyName] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const nameRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Focus first input field automatically on page load or tab switch
    if (nameRef.current) {
      nameRef.current.focus();
    }
    setError('');
  }, [accountType]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    // Form Validation
    if (!name.trim()) {
      setError('Please enter your full name');
      return;
    }
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (accountType === 'student' && !skills.trim()) {
        setError('Please enter your skills');
        return;
    }
    if (accountType === 'company' && !companyName.trim()) {
        setError('Please enter your company name');
        return;
    }

    try {
      setLoading(true);
      
      let endpoint = accountType === 'student' ? '/auth/student-register' : '/auth/company-register';
      
      let payload = {
        name,
        email,
        password,
        role: accountType
      };

      if (accountType === 'student') payload.skills = skills;
      if (accountType === 'company') payload.companyName = companyName;

      await api.post(endpoint, payload);
      
      // Redirect to login after successful registration
      navigate('/login');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred during registration. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 flex flex-col items-center justify-center bg-[#0F0B1A] p-4 relative overflow-hidden">
      
      {/* Background glowing effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10 my-8">
        
        {/* Toggle Buttons */}
        <div className="flex bg-[#1A1625] border border-purple-900 rounded-lg p-1.5 mb-6 shadow-xl backdrop-blur-sm relative">
          <button
            onClick={() => setAccountType('student')}
            type="button"
            className={`flex-1 py-2.5 text-sm font-semibold rounded-md transition-all duration-300 relative z-10 ${
              accountType === 'student' 
                ? 'text-purple-400' 
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            Sign up as Student
            {accountType === 'student' && (
              <div className="absolute inset-0 bg-[#0F0B1A] border border-purple-900/50 rounded-md -z-10 shadow-[0_0_10px_rgba(168,85,247,0.1)]"></div>
            )}
          </button>
          <button
            onClick={() => setAccountType('company')}
            type="button"
            className={`flex-1 py-2.5 text-sm font-semibold rounded-md transition-all duration-300 relative z-10 ${
              accountType === 'company' 
                ? 'text-purple-400' 
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            Sign up as Company
            {accountType === 'company' && (
               <div className="absolute inset-0 bg-[#0F0B1A] border border-purple-900/50 rounded-md -z-10 shadow-[0_0_10px_rgba(168,85,247,0.1)]"></div>
            )}
          </button>
        </div>

        {/* Signup Card */}
        <div className="bg-[#1A1625]/90 backdrop-blur-xl rounded-xl shadow-xl p-8 border border-purple-900 transition-all duration-500 hover:border-purple-800 hover:shadow-purple-500/5 group">
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-white mb-2">
              Create Your Account
            </h2>
            <p className="text-gray-400 text-sm font-medium">
              Join CampusHire and start your career journey.
            </p>
          </div>

          {error && (
            <div className="bg-red-900/10 border border-red-500/20 text-red-400 p-4 mb-6 rounded-lg text-sm flex items-center gap-3 backdrop-blur-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest" htmlFor="name">
                Full Name
              </label>
              <input
                ref={nameRef}
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-[#0F0B1A] border border-purple-900 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all hover:border-purple-800"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#0F0B1A] border border-purple-900 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all hover:border-purple-800"
                placeholder={accountType === 'student' ? 'student@email.com' : 'company@email.com'}
              />
            </div>

            {accountType === 'student' && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest" htmlFor="skills">
                  Skills
                </label>
                <input
                  id="skills"
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0F0B1A] border border-purple-900 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all hover:border-purple-800"
                  placeholder="e.g. React, Node.js, Python"
                />
              </div>
            )}

            {accountType === 'company' && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest" htmlFor="companyName">
                  Company Name
                </label>
                <input
                  id="companyName"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0F0B1A] border border-purple-900 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all hover:border-purple-800"
                  placeholder="Tech Corp Inc."
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0F0B1A] border border-purple-900 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all hover:border-purple-800"
                  placeholder="••••••••"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0F0B1A] border border-purple-900 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all hover:border-purple-800"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 px-4 mt-6 rounded-lg font-bold text-black bg-yellow-400 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all duration-300 transform ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(250,204,21,0.25)]'}`}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-purple-900/80">
            <p className="text-gray-400 text-sm font-medium">
              Already have an account?{' '}
              <Link to="/login" className="text-yellow-400 hover:text-yellow-300 transition-colors ml-1 font-semibold underline underline-offset-4 decoration-purple-600 hover:decoration-yellow-400">
                Login
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Signup;
