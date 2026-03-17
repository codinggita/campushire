import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import BackButton from '../components/BackButton';

function getInitials(name) {
  if (!name) return "";
  const words = name.trim().split(" ");
  if (words.length === 1) return words[0][0].toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

const Profile = () => {
  const { user, loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    about: '',
    skills: [],
    certificates: [],
    profilePhoto: ''
  });

  const [skillInput, setSkillInput] = useState('');
  const [certInput, setCertInput] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      setFormData({
        name: user.name || '',
        location: user.location || '',
        about: user.about || '',
        skills: user.skills || [],
        certificates: user.certificates || [],
        profilePhoto: user.profilePhoto || ''
      });
    }
  }, [user, navigate]);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePhoto: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, skillInput.trim()] }));
      setSkillInput('');
    }
  };

  const removeSkill = (skill) => {
    setFormData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
  };

  const addCert = () => {
    if (certInput.trim() && !formData.certificates.includes(certInput.trim())) {
      setFormData(prev => ({ ...prev, certificates: [...prev.certificates, certInput.trim()] }));
      setCertInput('');
    }
  };

  const removeCert = (cert) => {
    setFormData(prev => ({ ...prev, certificates: prev.certificates.filter(c => c !== cert) }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put('http://localhost:5000/api/auth/update-profile', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        if (res.data.user) {
           loginUser(res.data.user);
        } else {
           loginUser({ ...user, ...formData });
        }
        setIsEditing(false);
        alert('Profile updated successfully!');
      } else {
        alert("Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Failed to update profile');
      setIsEditing(false);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0F0B1A] pt-24 pb-12 px-4 sm:px-6 lg:px-8 text-white font-sans">
      <div className="max-w-4xl mx-auto">
        <BackButton />
        
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-purple-900/50 pb-6">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2">
              Your <span className="text-purple-400">Profile</span>
            </h1>
            <p className="text-gray-400 text-lg">Manage your personal information and preferences.</p>
          </div>
          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)}
              className="px-6 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-lg shadow-lg shadow-yellow-400/20 transition-colors w-max"
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button 
                onClick={() => setIsEditing(false)}
                className="px-6 py-2.5 border border-purple-700 hover:bg-purple-900/40 text-white font-medium rounded-lg transition-colors w-max"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={loading}
                className={`px-6 py-2.5 bg-green-500 hover:bg-green-400 text-black font-bold rounded-lg shadow-lg shadow-green-500/20 transition-colors w-max ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          )}
        </div>

        {/* Profile Card */}
        <div className="bg-[#1A1625] border border-purple-900 rounded-2xl p-8 shadow-xl shadow-black/20">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 border-b border-purple-900/50 pb-8 mb-8">
            <div className="relative group shrink-0">
               {formData.profilePhoto ? (
                 <img src={formData.profilePhoto} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-purple-700" />
               ) : (
                 <div className="w-32 h-32 bg-purple-900/50 text-purple-400 border-4 border-purple-700 rounded-full flex flex-shrink-0 items-center justify-center text-5xl font-bold uppercase overflow-hidden">
                   {getInitials(formData.name)}
                 </div>
               )}
               
               {isEditing && (
                 <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                   <label className="cursor-pointer text-white text-sm font-medium flex flex-col items-center">
                     <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                     </svg>
                     Upload
                     <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                   </label>
                 </div>
               )}
            </div>

            <div className="flex-1 w-full text-center md:text-left space-y-4">
              {isEditing ? (
                 <input 
                   type="text" 
                   value={formData.name}
                   onChange={e => setFormData({...formData, name: e.target.value})}
                   className="w-full bg-[#0F0B1A] border border-purple-900 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 font-bold text-2xl"
                   placeholder="Your Name"
                 />
              ) : (
                 <h2 className="text-3xl font-bold text-white mb-1">{formData.name}</h2>
              )}

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <span className="text-purple-400 font-medium tracking-wide text-xs uppercase bg-purple-900/30 px-3 py-1 rounded-full border border-purple-700/50">
                  {user.role} Account
                </span>
              </div>

              <div className="space-y-2 mt-4 text-gray-400">
                <p className="flex items-center justify-center md:justify-start">
                  <svg className="w-5 h-5 mr-3 text-gray-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {user.email} (Email cannot be changed)
                </p>
                <div className="flex items-center justify-center md:justify-start">
                  <svg className="w-5 h-5 mr-3 text-gray-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={formData.location}
                      onChange={e => setFormData({...formData, location: e.target.value})}
                      className="flex-1 bg-[#0F0B1A] border border-purple-900 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-purple-500 text-sm"
                      placeholder="e.g. San Francisco, Remote"
                    />
                  ) : (
                    <span>{formData.location || "Location not specified"}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* About Section */}
            <div>
              <h3 className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                About
              </h3>
              {isEditing ? (
                <textarea 
                  rows="4"
                  value={formData.about}
                  onChange={e => setFormData({...formData, about: e.target.value})}
                  className="w-full bg-[#0F0B1A] border border-purple-900 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 resize-y"
                  placeholder="Tell us about yourself..."
                ></textarea>
              ) : (
                <p className="text-gray-300 leading-relaxed bg-[#0F0B1A] p-4 rounded-lg border border-purple-900/30">
                  {formData.about || "No details provided yet."}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Skills Section */}
              <div className="bg-[#0F0B1A] p-5 rounded-xl border border-purple-900/50">
                <h3 className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Skills
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {formData.skills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-purple-900/30 border border-purple-700/50 text-purple-300 rounded-lg text-sm font-medium flex items-center">
                      {skill}
                      {isEditing && (
                        <button onClick={() => removeSkill(skill)} className="ml-2 hover:text-red-400 transition-colors">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </span>
                  ))}
                  {formData.skills.length === 0 && !isEditing && (
                    <p className="text-gray-500 text-sm">No skills added.</p>
                  )}
                </div>

                {isEditing && (
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={skillInput}
                      onChange={e => setSkillInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && addSkill()}
                      className="flex-1 bg-[#1A1625] border border-purple-900 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500"
                      placeholder="Add a skill (e.g. ReactJS)"
                    />
                    <button onClick={addSkill} className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors text-sm font-medium shrink-0">
                      Add
                    </button>
                  </div>
                )}
              </div>

              {/* Certificates Section */}
              <div className="bg-[#0F0B1A] p-5 rounded-xl border border-purple-900/50">
                <h3 className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  Certificates & Links
                </h3>
                
                <div className="space-y-3 mb-4">
                  {formData.certificates.map((cert, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-purple-900/20 border border-purple-800/50 rounded-lg group">
                      <a href={cert.startsWith('http') ? cert : `https://${cert}`} target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-purple-200 text-sm truncate max-w-[80%] hover:underline">
                        {cert}
                      </a>
                      {isEditing && (
                        <button onClick={() => removeCert(cert)} className="text-gray-500 hover:text-red-400 transition-colors">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                  {formData.certificates.length === 0 && !isEditing && (
                    <p className="text-gray-500 text-sm">No certificates or links added.</p>
                  )}
                </div>

                {isEditing && (
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={certInput}
                      onChange={e => setCertInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && addCert()}
                      className="flex-1 bg-[#1A1625] border border-purple-900 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500"
                      placeholder="Add URL (e.g. linkedin.com/in/...)"
                    />
                    <button onClick={addCert} className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors text-sm font-medium shrink-0">
                      Add
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;
