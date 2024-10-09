import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [pin, setPin] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (pin === '123456') {
      navigate('/dash');
    } else {
      alert('Invalid Pin');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen overflow-hidden">
      <div className="relative w-full max-w-sm p-8 bg-white rounded-lg shadow-2xl">
        {/* Glowing Ring Animation */}
       

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="https://ugc.production.linktr.ee/721e0bcc-2bac-4276-b0eb-fbf98850c24b_341003461-131759759779160-525686003715477474-n.jpeg?io=true&size=avatar-v3_0" 
            alt="Logo"
            className="w-24 h-24 rounded-full shadow-lg"
          />
        </div>

        {/* Pin Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-semibold mb-2">
            Enter Admin Pin
          </label>
          <input
            type="password"
            maxLength="6"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleLogin}
          className="w-full py-2 px-4 font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
