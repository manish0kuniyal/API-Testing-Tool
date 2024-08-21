import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the elements you need for the Doughnut chart
Chart.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  // Define your chart data
  const data = {
    datasets: [
      {
        label: 'My Dataset',
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Define chart options
  const options = {
    plugins: {
      legend: {
        position: 'top',
      },cutout:{cutout:115},
      borderRadius:30,
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="chart-container border-2" style={{ position: 'relative', height: '400px', width: '400px' }} >
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
