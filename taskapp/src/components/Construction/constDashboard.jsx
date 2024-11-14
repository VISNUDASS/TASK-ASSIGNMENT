import React from 'react';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement, RadialLinearScale } from 'chart.js';

// Register the required components from Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

const ConstCharts = () => {
  // Line Chart Data
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Yearly Data Employee Task % Completion',
        data: [30, 20, 40, 45, 50, 35, 40, 30, 20, 30, 33, 40],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Yearly Data Overview',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 30,
        },
      },
    },
  };

  // Pie Chart Data
  const pieData = {
    labels: ['To Do', 'In Progress', 'In Review', 'Done'],
    datasets: [
      {
        data: [10, 30, 20, 40],
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0'],
        hoverBackgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0'],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  // Bar Chart Data
  const barData = {
    labels: ['Arjun', 'Megha', 'Rajesh'],
    datasets: [
      {
        label: 'Tasks Completed',
        data: [12, 19, 8, 10],
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0'],
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Task Completion by Worker',
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#000',
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5,
        },
      },
    },
  };

  // Stacked Bar Chart Data
  const stackedBarData = {
    labels: ['Arjun', 'Megha', 'Rajesh'],
    datasets: [
      { label: 'To Do', data: [3, 2, 4, 1], backgroundColor: '#ff6384' },
      { label: 'In Progress', data: [2, 3, 1, 2], backgroundColor: '#36a2eb' },
      { label: 'Completed', data: [7, 14, 3, 7], backgroundColor: '#4bc0c0' },
    ],
  };

  const stackedBarOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  };

  // Radar Chart Data
  const radarData = {
    labels: ['Site Preparation', 'Foundation Work', 'Framing', 'Roofing', 'Electrical Work','Plumbing','Finishing Work','Inspection'],
    datasets: [
      {
        label: 'Arjun',
        data: [85, 90, 75, 80, 95 ,70 , 80 , 80],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
      },
      {
        label: 'Megha',
        data: [80, 85, 70, 85, 80 , 57 , 80 , 90, 80],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
      },
    ],
  };

  const radarOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      r: {
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <div>
      

      <div>
        <h3>Line Chart: Task Completion</h3>
        <Line data={lineData} options={lineOptions} />
      </div>

      <div>
        <h3>Pie Chart: Task Distribution</h3>
        <Doughnut data={pieData} options={pieOptions} />
      </div>

      <div>
        <h3>Bar Chart: Task Completion by Member</h3>
        <Bar data={barData} options={barOptions} />
      </div>

      <div>
        <h3>Stacked Bar Chart: Task Distribution by Member</h3>
        <Bar data={stackedBarData} options={stackedBarOptions} />
      </div>

      <div>
        <h3>Radar Chart: Performance Metrics</h3>
        <Radar data={radarData} options={radarOptions} />
      </div>
    </div>
  );
};

export default ConstCharts;
