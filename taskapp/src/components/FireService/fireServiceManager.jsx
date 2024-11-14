import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const FireServiceManager = () => {
  const userId = '111';
  const [isTaskFormVisible, setIsTaskFormVisible] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]); // For multi-select employee
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [todayDate, setTodayDate] = useState('');
  const [managerName, setManagerName] = useState('');
  const [employees, setEmployees] = useState([
    { name: 'Guru', department: 'Sr.Driver', tasks: [] },
    { name: 'Ajith', department: 'Fire handler', tasks: [] },
    { name: 'Karthik', department: 'Water holder', tasks: [] },
  ]);
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [newEmployeeDepartment, setNewEmployeeDepartment] = useState('');
  const [employeeTasks, setEmployeeTasks] = useState({}); // To store tasks for each employee
  const [visibleStatus, setVisibleStatus] = useState({}); // Track visibility of task status

  const navigate = useNavigate(); // Initialize useNavigate

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleString();
  };

  const handleLogout = () => {
    navigate('/manager-login');
  };

  const handleTaskFormSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      taskName,
      dueDate,
      todayDate,
      taskCreationTime: getCurrentTime(),
      userId: '111',
      status: 'todo',
    };

    useEffect(() => {
      // Retrieve the manager's name from localStorage
      const storedName = localStorage.getItem('managerName');
      if (storedName) {
        setManagerName(storedName);
      }
    }, []); 

    // Assign the task to all selected employees
    const updatedEmployees = employees.map((employee) => {
      if (selectedEmployees.includes(employee.name)) {
        return {
          ...employee,
          tasks: [...employee.tasks, newTask],
        };
      }
      return employee;
    });

    setEmployees(updatedEmployees);

    // Send task data to the backend for each selected employee
    selectedEmployees.forEach((employeeName) => {
      const taskData = { ...newTask, employeeName, employeeEmail };
      axios.post('http://localhost:5000/fireservice', taskData)
        .then((response) => {
          console.log('Task added:', response.data);
        })
        .catch((error) => {
          console.error('Error adding task:', error);
        });
    });

    alert('Task assigned to selected employees successfully!');

    // Clear form fields
    setTaskName('');
    setDueDate('');
    setTodayDate('');
    setSelectedEmployees([]);
    setIsTaskFormVisible(false);
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    const newEmployee = { name: newEmployeeName, department: newEmployeeDepartment, tasks: [] };
    setEmployees([...employees, newEmployee]);
    setNewEmployeeName('');
    setNewEmployeeDepartment('');
    alert('Employee added successfully!');
  };

  const fetchEmployeeTasks = (employeeName) => {
    // Replace this URL with your actual endpoint
    axios.get(`http://localhost:5000/fireservice/${userId}`)
      .then((response) => {
        setEmployeeTasks((prev) => ({
          ...prev,
          [employeeName]: response.data,
        }));
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  };

  const handleShowStatusClick = (employeeName) => {
    if (visibleStatus[employeeName]) {
      setVisibleStatus((prev) => ({ ...prev, [employeeName]: false }));
    } else {
      fetchEmployeeTasks(employeeName);
      setVisibleStatus((prev) => ({ ...prev, [employeeName]: true }));
    }
  };

  const handleDeleteEmployee = (employeeName) => {
    setEmployees(employees.filter((employee) => employee.name !== employeeName));
    alert(`Employee ${employeeName} deleted successfully!`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-gray-100 text-black shadow-md w-full fixed top-0 left-0 z-10">
        <div className="max-w-full px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">FireService Management</h1>
          <div className="flex space-x-4 sm:space-x-8">
            <a href="/fireservice-dashboard" className="text-xl text-black">View Dashboard</a>
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
          <h2 className="text-2xl font-bold mb-4">Fire Service Manager: {managerName}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {employees.map((employee, index) => (
              <div key={index} className="bg-gray-200 p-4 rounded-lg shadow">
                <h3 className="font-semibold text-xl">{employee.name}</h3>
                <p className="text-gray-600">{employee.department}</p>
                <button
                  className="mt-2 bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded transition duration-200"
                  onClick={() => setIsTaskFormVisible(true)}
                >
                  Add Task
                </button>
                <button
                  className="mt-2 bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded transition duration-200 ml-2" // Added margin-left
                  onClick={() => handleShowStatusClick(employee.name)} // Show/hide status button
                >
                  {visibleStatus[employee.name] ? 'Hide Status' : 'Show Status'}
                </button>
                <button
                  className="mt-2 bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded transition duration-200 ml-2"
                  onClick={() => handleDeleteEmployee(employee.name)} // Delete employee button
                >
                  Delete
                </button>

                {/* Task Status Display */}
                {visibleStatus[employee.name] && employeeTasks[employee.name] && (
                  <div className="mt-2">
                    <h4 className="font-semibold">Task Status:</h4>
                    {employeeTasks[employee.name].map((task, taskIndex) => (
                      <div key={taskIndex} className="flex justify-between items-center my-1">
                        <p className="font-semibold">{task.taskName}</p>
                        {task.status === 'todo' ? (
                          <span className="text-red-600">Pending</span>
                        ) : (
                          <span className="text-green-600">✔️ Done</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-2">
                  <h4 className="font-semibold">Assigned Tasks:</h4>
                  {employee.tasks.length === 0 ? (
                    <p>No tasks assigned.</p>
                  ) : (
                    employee.tasks.map((task, taskIndex) => (
                      <div key={taskIndex} className="bg-white p-2 my-1 rounded shadow">
                        <p className="font-semibold">{task.taskName}</p>
                        <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
                        <p className="text-sm text-gray-500">Created: {task.taskCreationTime}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>

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

      {isTaskFormVisible && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Assign Task</h2>
            <form onSubmit={handleTaskFormSubmit}>
              {/* Multi-select for Employees */}
              <label className="block mb-2 font-semibold">Select Employees:</label>
              <select
                multiple
                value={selectedEmployees}
                onChange={(e) =>
                  setSelectedEmployees([...e.target.selectedOptions].map(option => option.value))
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
                type="email"
                placeholder="Employee Email"
                value={employeeEmail}
                onChange={(e) => setEmployeeEmail(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                required
              />
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
                  onChange={(e) => setTodayDate(e.target.value)}
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

export default FireServiceManager;
