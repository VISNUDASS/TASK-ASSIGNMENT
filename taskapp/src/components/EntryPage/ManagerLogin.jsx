import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import loginImage from '../../assets/taskLogo.png'; // Path to your image asset

const ManagerLogin = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [selectedRole, setSelectedRole] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    resetForm(); 
  };

  const resetForm = () => {
    setEmail('');
    setName('');
    setPassword('');
    setSelectedRole('');
    setCompanyName('');
  };

  const handleLogin = () => {
    const techEmail = 'techadmin@gmail.com';
    const techPassword = 'techadmin';

    const constEmail = 'constadmin@gmail.com';
    const constPassword = 'constadmin';

    const healthEmail = 'healthadmin@gmail.com';
    const healthPassword = 'healthadmin';
  
    const fireEmail = 'fireadmin@gmail.com';
    const firePassword = 'fireadmin';

    if (email && password && selectedRole) {
      if (
        (email === techEmail && password === techPassword && selectedRole === 'Tech Manager') ||
        (email === constEmail && password === constPassword && selectedRole === 'Construction Manager') ||
        (email === healthEmail && password === healthPassword && selectedRole === 'Healthcare Manager') ||
        (email === fireEmail && password === firePassword && selectedRole === 'FireService Manager')
      ) {
        localStorage.setItem('managerName', selectedRole); // Store the role as the manager's name
        switch (selectedRole) {
          case 'Tech Manager':
            navigate('/manager-dashboard');
            break;
          case 'Construction Manager':
            navigate('/construction-manager');
            break;
          case 'Healthcare Manager':
            navigate('/healthcare-manager');
            break;
          case 'FireService Manager':
            navigate('/fireservice-manager');
            break;
          default:
            alert('Invalid role');
        }
      } else {
        alert('Invalid credentials or role mismatch.');
      }
    } else {
      alert('Please fill in all fields for login.');
    }
  };

  const handleRegister = () => {
    if (!name || !email || !password || !selectedRole || !companyName) {
      alert('Please fill in all fields.');
      return;
    }

    localStorage.setItem('managerName', name); // Store the manager's name after successful registration
    alert(`Registered successfully as ${selectedRole}!`);
    navigate('/manager-dashboard');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLoginMode) {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-100 to-gray-200">
      <div className="container mx-auto flex shadow-lg rounded-lg overflow-hidden max-w-4xl">
        {/* Image Section */}
        <div className="w-1/2">
          <img src={loginImage} alt="Login Visual" className="object-cover w-full h-full" />
        </div>

        {/* Form Section */}
        <div className="w-1/2 p-8 bg-white flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            {isLoginMode ? 'Manager Login' : 'Manager Register'}
          </h2>

          <div className="flex justify-center mb-6">
            <button
              className={`px-4 py-2 mx-2 ${isLoginMode ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
              onClick={toggleMode}
            >
              Login
            </button>
            <button
              className={`px-4 py-2 mx-2 ${!isLoginMode ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
              onClick={toggleMode}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Register fields */}
            {!isLoginMode && (
              <>
                <input
                  type="text"
                  placeholder="Manager Name"
                  required={!isLoginMode}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Company Name"
                  required={!isLoginMode}
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </>
            )}

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

            <label htmlFor="role" className="block text-gray-700 mb-2">
              Select your manager role:
            </label>
            <select
              id="role"
              name="role"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              required
              className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select your role
              </option>
              <option value="Tech Manager">Tech Manager</option>
              <option value="Construction Manager">Construction Manager</option>
              <option value="Healthcare Manager">Healthcare Manager</option>
              <option value="FireService Manager">FireService Manager</option>
            </select>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
            >
              {isLoginMode ? 'Login' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManagerLogin;
