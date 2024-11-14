import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import loginImage from '../../assets/loginLogo.jpeg';

const WorkerLogin = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const predefinedCredentials = [
    { email: 'hari@gmail.com', password: 'hari', path: '/tech-industry' },
    { email: 'anand@gmail.com', password: 'anand', path: '/construction' },
    { email: 'akash@gmail.com', password: 'akash', path: '/healthcare-worker' },
    { email: 'vijay@gmail.com', password: 'vijay', path: '/fireservice-worker' }
  ];

  const handleSignUp = async (e) => {
    e.preventDefault();

    const isExistingUser = predefinedCredentials.find(
      (cred) => cred.email === email && cred.password === password
    );

    if (isExistingUser && selectedRole) {
      navigate(isExistingUser.path);
    } else if (selectedRole) {
      try {
        const response = await fetch('http://localhost:5000/register-user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, role: selectedRole })
        });
        
        const data = await response.json();
        console.log(data);
        
        if (data.success) {
          navigate(`/new-user/${data.dbName}`);
        } else {
          alert('Error creating new user database.');
        }
      } catch (error) {
        alert('Error creating new user database.');
      }
    } else {
      alert('Invalid credentials or role not selected');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-100 to-gray-200">
      <div className="container mx-auto flex shadow-lg rounded-lg overflow-hidden max-w-4xl">
        <div className="w-1/2">
          <img
            src={loginImage}
            alt="Login Visual"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-1/2 p-8 bg-white flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Worker Login</h2>
          <form onSubmit={handleSignUp}>
            <input
              type="text"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="relative mb-4">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
            <label htmlFor="role" className="block text-gray-700 mb-2">Select your worker role:</label>
            <select
              id="role"
              name="role"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              required
              className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select your role</option>
              <option value="Tech Worker">Tech Worker</option>
              <option value="Construction Worker">Construction Worker</option>
              <option value="Healthcare Worker">Healthcare Worker</option>
              <option value="Fire Service Worker">Fire Service Worker</option>
            </select>
            <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WorkerLogin;
