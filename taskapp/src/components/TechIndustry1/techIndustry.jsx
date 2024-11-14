// TechIndustry.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const TechIndustry1 = () => {
  const userId = '026'; // Replace with actual user ID
  const [todoTasks, setTodoTasks] = useState([]);
  const [employeeName, setEmployeeName] = useState('');
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [draftingTasks, setDraftingTasks] = useState([]);
  const [inReviewTasks, setInReviewTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isQueryFormVisible, setIsQueryFormVisible] = useState(false); // Add state for query form visibility
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const navigate = useNavigate();
  const currentDateTime = new Date().toLocaleString();
  const [todayDate , settodayDate]=useState(''); // Fetch current date and time

console.log("Current Date and Time: ", currentDateTime);

   // Initialize useNavigate

  useEffect(() => {
    axios.get(`http://localhost:5000/tech-tasks/${userId}`)
      .then((response) => {
        const tasks = response.data.map(task => ({
          ...task,
          dueDate: new Date(task.dueDate).toISOString().split('T')[0] // Format dueDate
        }));
        setTodoTasks(tasks.filter(task => task.status === 'todo'));
        setDraftingTasks(tasks.filter(task => task.status === 'drafting'));
        setInReviewTasks(tasks.filter(task => task.status === 'inReview'));
        setDoneTasks(tasks.filter(task => task.status === 'done'));
      })
      .catch((error) => console.error(error));
  }, [userId]);
  
   const moveTask = (task, source, target, newStatus) => {
    source((prevTasks) => prevTasks.filter((t) => t._id !== task._id));
    axios.put(`http://localhost:5000/tech-tasks/${task._id}`, { ...task, status: newStatus })
      .then((response) => {
        target((prevTasks) => [...prevTasks, response.data]);
      })
      .catch((error) => console.error(error));
  };

  const deleteTask = (taskId, status) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
    axios.delete(`http://localhost:5000/tech-tasks/${taskId}`)
      .then(() => {
        // Remove the task from the corresponding list based on status
        if (status === 'todo') {
          setTodoTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
        } else if (status === 'drafting') {
          setDraftingTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
        } else if (status === 'inReview') {
          setInReviewTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
        } else if (status === 'done') {
          setDoneTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
        }
        
      })
    
      .catch((error) => console.error('Error deleting task:', error));
    }
  };

  const handleFormSubmit = (e) => {
    
    e.preventDefault();
    
    const task = {
      employeeName,
      employeeEmail,
      taskName,
      dueDate,
      todayDate,
      userId: '026',
      status: 'todo' // Set initial status to 'todo'
    };

    axios.post('http://localhost:5000/tech-tasks', task)
      .then((response) => {
        console.log('Task added:', response.data);
        alert('TASK ADDED SUCCESSFULLY');
        setEmployeeName('');
        setEmployeeEmail('');
        setTaskName('');
        setDueDate('');
        settodayDate('');
        setIsFormVisible(false); // Hide the form after submission
      })
      .catch((error) => {
        console.error('Error adding task:', error);
      });
  };

  const handleQuerySubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/ask-query', { query })
      .then((response) => {
        setResponse(response.data.response);
      })
      .catch((error) => console.error(error));
  };

  const handleSafetyMeasuresClick = () => {
    navigate('/safety-measures'); // Navigate to the safety measures page
  };
 
  
  

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-gray-100 text-black shadow-md w-full fixed top-0 left-0 z-10">
        <div className="max-w-full px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Tech Industry</h1>
          <div className="flex space-x-4 sm:space-x-8">
            <a href="/dashboard" className="bg-green-500 hover:bg-green-700 text-lg font-bold text-white py-2 px-4 rounded transition duration-200">View Dashboard</a>
            <button
              className="bg-green-500 hover:bg-green-700 text-lg font-bold text-white py-2 px-4 rounded transition duration-200"
              onClick={() => setIsFormVisible(true)}
            >
              Create Task
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-lg font-bold text-white py-2 px-4 rounded transition duration-200"
              onClick={() => setIsQueryFormVisible(true)} // Toggle query form visibility
            >
              Ask a Question
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-lg font-bold text-white py-2 px-4 rounded transition duration-200"
              onClick={handleSafetyMeasuresClick} // Navigate to safety measures page
            >
              Safety Measures
            </button>
          </div>
        </div>
      </nav>

      {/* Task Board */}
      <div className="pt-20 px-4 sm:px-10 py-5 mt-10 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {/* To Do Column */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold text-gray-700 mb-4">To Do</h2>
            <div className="space-y-4">
              {todoTasks.map((task) => (
                
                <div key={task._id} className="bg-gray-100 p-3 rounded-lg shadow">
                  <h3 className="font-semibold">{task.taskName}</h3>
                 
                  <span className="text-xs text-red-600">Due: {task.dueDate}</span>
                  <h2 className="text-xs text-red-600">
  Created Date: {new Date(task.todayDate).toLocaleDateString('en-CA')} {/* This will format the date */}
</h2>
                  
                  
                 
                  <button
                    className="text-red-500 p-4 hover:text-red-700 mt-2"
                    onClick={() => deleteTask(task._id, 'todo')} // Delete task
                  >
                    Delete Task
                  </button>
                  {/* Move to Drafting */}
                  <button
                    className="text-blue-500 hover:text-blue-700 mt-2"
                    onClick={() => moveTask(task, setTodoTasks, setDraftingTasks, 'drafting')}
                  >
                    Move to Drafting
                  </button>
                </div>
              ))}
            </div>

            {/* Show Add Task button or form */}
            {!isFormVisible ? (
              <button
                onClick={() => setIsFormVisible(true)} // Show form on click
                className="bg-green-500 hover:bg-green-700 text-sm font-bold text-white py-2 px-4 rounded transition duration-200 mt-5"
              >
                Add Task +
              </button>
            ) : (
              // Task form
              <form onSubmit={handleFormSubmit} className="mt-4">
                <input
                  type="text"
                  placeholder="Employee Name"
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  className="w-full p-2 mb-4 border border-gray-300 rounded"
                  required
                />
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
                <label htmlFor="dueDate" className="block mb-2 text-gray-700">Due Date</label>
<input
  id="dueDate"
  type="date"
  value={dueDate}
  onChange={(e) => setDueDate(e.target.value)}
  className="w-full p-2 mb-4 border border-gray-300 rounded"
  required
/>

<label htmlFor="creationDate" className="block mb-2 text-gray-700">Date of Task Creation</label>
<input
  id="creationDate"
  type="date"
  value={todayDate}
  onChange={(e) => settodayDate(e.target.value)}
  className="w-full p-2 mb-4 border border-gray-300 rounded"
  required
/>

                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add Task
                </button>
                <button
                  type="button"
                  onClick={() => setIsFormVisible(false)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                >
                  Cancel
                </button>
              </form>
            )}
          </div>

          
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Drafting</h2>
            <div className="space-y-4">
              {draftingTasks.map((task) => (
                <div key={task._id} className="bg-gray-100 p-3 rounded-lg shadow">
                  <h3 className="font-semibold">{task.taskName}</h3>
                  <span className="text-xs text-red-600">Due: {task.dueDate}</span>
                  
                  <button
                    className="text-red-500 p-4 hover:text-red-700 mt-2"
                    onClick={() => deleteTask(task._id, 'drafting')} // Delete task
                  >
                    Delete Task
                  </button>
                  {/* Move to In Review */}
                  <button
                    className="text-blue-500 hover:text-blue-700 mt-2"
                    onClick={() => moveTask(task, setDraftingTasks, setInReviewTasks, 'inReview')}
                  >
                    Move to In Review
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* In Review Column */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold text-gray-700 mb-4">In Review</h2>
            <div className="space-y-4">
              {inReviewTasks.map((task) => (
                <div key={task._id} className="bg-gray-100 p-3 rounded-lg shadow">
                  <h3 className="font-semibold">{task.taskName}</h3>
                  <span className="text-xs text-red-600">Due: {task.dueDate}</span>
                 
                  <button
                    className="text-red-500 p-4 hover:text-red-700 mt-2"
                    onClick={() => deleteTask(task._id, 'inReview')} // Delete task
                  >
                    Delete Task
                  </button>
                  {/* Move to Done */}
                  <button
                    className="text-blue-500 hover:text-blue-700 mt-2"
                    onClick={() => moveTask(task, setInReviewTasks, setDoneTasks, 'done')}
                  >
                    Move to Done
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Done Column */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Done</h2>
            <div className="space-y-4">
              {doneTasks.map((task) => (
                <div key={task._id} className="bg-gray-100 p-3 rounded-lg shadow">
                  <h3 className="font-semibold">{task.taskName}</h3>
                  <span className="text-xs text-red-600">Due: {task.dueDate}</span>
                  
                  <button
                    className="text-red-500 p-4 hover:text-red-700 mt-2"
                    onClick={() => deleteTask(task._id, 'done')} // Delete task
                  >
                    Delete Task
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Query Form */}
        <div className={`mt-4 transform transition-all duration-500 ease-in-out ${isQueryFormVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-10 scale-90 pointer-events-none'}`}>
  {isQueryFormVisible && (
    <form onSubmit={handleQuerySubmit} className="transition-all">
      <input
        type="text"
        placeholder="Ask your question..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        Submit Query
      </button>
      <button
        type="button"
        onClick={() => setIsQueryFormVisible(false)} // Hide query form
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 ml-2 transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        Cancel
      </button>
    </form>
  )}
  {response && (
    <div className="mt-4 transition-opacity duration-500 ease-in-out">
      <h3 className="font-semibold mb-2">Response:</h3>
      <div className="bg-gray-100 p-4 rounded-md shadow-sm">
        {response.includes('```') ? (
          // Check if response contains markdown code blocks
          <pre className="bg-gray-900 text-white p-4 rounded-md overflow-x-auto">
            <code>{response.replace(/```/g, '')}</code> {/* Remove markdown-style ticks */}
          </pre>
        ) : (
          <p className="whitespace-pre-wrap">{response}</p>
        )}
      </div>
    </div>
  )}
</div>


      </div>
    </div>
  );
};

export default TechIndustry1;
