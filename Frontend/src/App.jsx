import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';

const Dashboard = () => (
  <div className="min-h-screen pt-20 flex flex-col items-center justify-center bg-[#0F0B1A]">
    <h1 className="text-4xl font-extrabold text-white">Welcome to your <span className="text-yellow-400">Dashboard</span></h1>
  </div>
);

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
