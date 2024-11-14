import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ConstManager = () => {
  const [isTaskFormVisible, setIsTaskFormVisible] = useState(false);
  const [taskEmployeeNames, setTaskEmployeeNames] = useState([]); // Multi-select employees
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [todayDate, settodayDate] = useState('');
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [newEmployeeDepartment, setNewEmployeeDepartment] = useState('');
  const [managerName, setManagerName] = useState('');
  const [employees, setEmployees] = useState([
    { name: 'Arjun', department: 'Civil Engineer', tasks: [] },
    { name: 'Megha', department: 'Electrical Engineer', tasks: [] },
    { name: 'Rajesh', department: 'Site Supervisor', tasks: [] },
  ]);

  const navigate = useNavigate(); // Initialize useNavigate

  const handleTaskFormSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      taskName,
      dueDate,
      todayDate,
      status: 'todo',
      userId: '123',
    };

    // Loop through selected employees and add the task to each
    const updatedEmployees = employees.map((employee) => {
      if (taskEmployeeNames.includes(employee.name)) {
        return {
          ...employee,
          tasks: [...employee.tasks, newTask],
        };
      }
      return employee;
    });

    setEmployees(updatedEmployees);

    // Send task data to the backend for each employee
    taskEmployeeNames.forEach((employeeName) => {
      axios.post('http://localhost:5000/construction', {
        ...newTask,
        employeeName,
      })
        .then((response) => {
          console.log('Task added:', response.data);
        })
        .catch((error) => {
          console.error('Error adding task:', error);
        });
    });

    // Clear form fields
    setTaskEmployeeNames([]);
    setTaskName('');
    setDueDate('');
    settodayDate('');
    setIsTaskFormVisible(false);
    alert('Task assigned successfully to multiple employees!');
  };

  useEffect(() => {
    // Retrieve the manager's name from localStorage
    const storedName = localStorage.getItem('managerName');
    if (storedName) {
      setManagerName(storedName);
    }
  }, []);

  const handleAddEmployee = (e) => {
    e.preventDefault();
    const newEmployee = { name: newEmployeeName, department: newEmployeeDepartment, tasks: [] };
    setEmployees([...employees, newEmployee]);
    setNewEmployeeName('');
    setNewEmployeeDepartment('');
    alert('Employee added successfully!');
  };

  const handleDeleteEmployee = (employeeName) => {
    const updatedEmployees = employees.filter((employee) => employee.name !== employeeName);
    setEmployees(updatedEmployees);
    alert(`${employeeName} has been deleted successfully!`);
  };

  const handleLogout = () => {
    // Handle any logout logic (clear tokens, etc.) and navigate to the login page
    navigate('/manager-login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-gray-100 text-black shadow-md w-full fixed top-0 left-0 z-10">
        <div className="max-w-full px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Construction Management</h1>
          <div className="flex space-x-4 sm:space-x-8">
            <a href="/const-worker-dashboard" className="text-xl text-black">View Dashboard</a>
            <button
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition duration-200"
              onClick={handleLogout} // Trigger logout on click
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-20 px-4 sm:px-10 py-5 mt-10 w-full">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-2xl font-bold mb-4">Engineer: {managerName}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {employees.map((employee, index) => (
              <div key={index} className="bg-gray-200 p-4 rounded-lg shadow">
                <h3 className="font-semibold text-xl">{employee.name}</h3>
                <p className="text-gray-600">{employee.department}</p>
                <button
                  className="mt-2 bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded transition duration-200"
                  onClick={() => setIsTaskFormVisible(true)} // Show task form
                >
                  Add Task
                </button>
                <button
                  className="mt-2 bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded transition duration-200"
                  onClick={() => handleDeleteEmployee(employee.name)} // Delete employee
                >
                  Delete Employee
                </button>
                <div className="mt-2">
                  <h4 className="font-semibold">Assigned Tasks:</h4>
                  {employee.tasks.length === 0 ? (
                    <p>No tasks assigned.</p>
                  ) : (
                    employee.tasks.map((task, taskIndex) => (
                      <div key={taskIndex} className="bg-white p-2 my-1 rounded shadow">
                        <p className="font-semibold">{task.taskName}</p>
                        <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add Employee Form */}
          <h3 className="text-lg font-semibold mt-4">Add Employee</h3>
          <form onSubmit={handleAddEmployee} className="mb-4">
            <input
              type="text"
              placeholder="Employee Name"
              value={newEmployeeName}
              onChange={(e) => setNewEmployeeName(e.target.value)}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              placeholder="Department"
              value={newEmployeeDepartment}
              onChange={(e) => setNewEmployeeDepartment(e.target.value)}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
              required
            />
            <button
              type="submit"
              className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
            >
              Add Employee
            </button>
          </form>
        </div>
      </div>

      {/* Task Form for Adding Tasks */}
      {isTaskFormVisible && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Assign Task</h2>
            <form onSubmit={handleTaskFormSubmit}>
              <label className="block text-lg font-semibold mb-2">Select Employees</label>
              <select
                multiple
                value={taskEmployeeNames}
                onChange={(e) =>
                  setTaskEmployeeNames([...e.target.selectedOptions].map((option) => option.value))
                }
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                required
              >
                {employees.map((employee, index) => (
                  <option key={index} value={employee.name}>
                    {employee.name} - {employee.department}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Task Name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                required
              />
              <div className="mb-4">
                <label htmlFor="dueDate" className="block text-gray-700 mb-1">Due Date</label>
                <input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="todayDate" className="block text-gray-700 mb-1">Today's Date</label>
                <input
                  id="todayDate"
                  type="date"
                  value={todayDate}
                  onChange={(e) => settodayDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
              >
                Add Task
              </button>
            </form>
            <button
              className="mt-4 w-full py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
              onClick={() => setIsTaskFormVisible(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConstManager;
