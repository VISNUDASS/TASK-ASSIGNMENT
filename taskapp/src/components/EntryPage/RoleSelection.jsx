import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleWorkerLogin = () => {
    navigate('/worker-login');
  };

  const handleManagerLogin = () => {
    navigate('/manager-login');
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-blue-600"
      style={{
        backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')", // Subtle background pattern
        backgroundSize: 'cover',
      }}
    >
      <h1 className="mb-8 text-4xl font-extrabold text-black drop-shadow-lg">
        Select Your Role
      </h1>
      <div className="flex space-x-8">
        {/* Worker Login Button */}
        <button
          onClick={handleWorkerLogin}
          className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300 transform hover:scale-105"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135789.png"
            alt="Worker Icon"
            className="w-20 h-20 mb-4 mx-auto"
          />
          <p className="text-lg font-semibold text-gray-800 text-center">
            Worker Login
          </p>
        </button>

        {/* Manager Login Button */}
        <button
          onClick={handleManagerLogin}
          className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300 transform hover:scale-105"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png"
            alt="Manager Icon"
            className="w-20 h-20 mb-4 mx-auto"
          />
          <p className="text-lg font-semibold text-gray-800 text-center">
            Manager Login
          </p>
        </button>
      </div>
    </div>
  );
};

export default RoleSelection;
