import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { studentLoginCall, companyLoginCall } from '../services/api';

const Login = () => {
  const [loginType, setLoginType] = useState('student'); // 'student' or 'company'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef(null);
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Focus email input automatically on page load or tab switch
    if (emailRef.current) {
      emailRef.current.focus();
    }
    // Clear errors when switching tabs
    setError('');
  }, [loginType]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    // Form Validation
    if (!email.trim() && !password.trim()) {
      setError('Please enter your email and password');
      return;
    }
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your password');
      return;
    }

    try {
      setLoading(true);

      let data;
      if (loginType === 'student') {
        data = await studentLoginCall({ email, password });
      } else {
        data = await companyLoginCall({ email, password });
      }

      // Store user data
      loginUser(data.user);

      // Redirect
      navigate('/dashboard');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Invalid email or password');
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

      <div className="w-full max-w-md relative z-10">

        {/* Toggle Buttons */}
        <div className="flex bg-[#1A1625] border border-purple-900 rounded-lg p-1.5 mb-6 shadow-xl backdrop-blur-sm relative">
          <button
            onClick={() => setLoginType('student')}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-md transition-all duration-300 relative z-10 ${loginType === 'student'
              ? 'text-purple-400'
              : 'text-gray-500 hover:text-gray-300'
              }`}
          >
            Student Login
            {loginType === 'student' && (
              <div className="absolute inset-0 bg-[#0F0B1A] border border-purple-900/50 rounded-md -z-10 shadow-[0_0_10px_rgba(168,85,247,0.1)]"></div>
            )}
          </button>
          <button
            onClick={() => setLoginType('company')}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-md transition-all duration-300 relative z-10 ${loginType === 'company'
              ? 'text-purple-400'
              : 'text-gray-500 hover:text-gray-300'
              }`}
          >
            Company Login
            {loginType === 'company' && (
              <div className="absolute inset-0 bg-[#0F0B1A] border border-purple-900/50 rounded-md -z-10 shadow-[0_0_10px_rgba(168,85,247,0.1)]"></div>
            )}
          </button>
        </div>

        {/* Login Card */}
        <div className="bg-[#1A1625]/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-purple-900/80 transition-all duration-500 hover:border-purple-800 hover:shadow-purple-500/5 group">

          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-white mb-2">
              Welcome Back <span className="inline-block animate-pulse text-yellow-400">✨</span>
            </h2>
            <p className="text-gray-400 text-sm font-medium">
              {loginType === 'student' ? 'Login to your student account' : 'Login to your company dashboard'}
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

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest" htmlFor="email">
                Email
              </label>
              <input
                ref={emailRef}
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#0F0B1A] border border-purple-900 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all hover:border-purple-800"
                placeholder={loginType === 'student' ? 'student@email.com' : 'company@email.com'}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest" htmlFor="password">
                  Password
                </label>
                <a href="#" className="text-xs text-yellow-400 hover:text-yellow-300 transition-colors font-medium">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0F0B1A] border border-purple-900 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all hover:border-purple-800 pr-12"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors flex items-center justify-center p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 px-4 mt-6 rounded-lg font-bold text-black bg-yellow-400 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all duration-300 transform ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(250,204,21,0.25)]'}`}
            >
              {loading ? 'Authenticating...' : `Login as ${loginType === 'student' ? 'Student' : 'Company'}`}
            </button>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-purple-900/80">
            <p className="text-gray-400 text-sm font-medium">
              Don't have an account?{' '}
              <Link to="/signup" className="text-white hover:text-yellow-400 transition-colors ml-1 font-semibold underline underline-offset-4 decoration-purple-600 hover:decoration-yellow-400">
                Sign up as {loginType === 'student' ? 'Student' : 'Company'}
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
