import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { fakeProgressData } from "./Data";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Linegraph({ data = fakeProgressData }) {
  const days = data.length;
  const labels = Array.from({ length: days }, (_, i) => `Day ${i + 1}`);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `User Progress Over ${days} Days`,
      },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
      },
    },
    elements: {
      line: {
        tension: 0.4, // Adjust the tension for smoothness
      }
    },
    scales: {
      x: {
        ticks: {
          rotation: -45, // Tilt the labels to make them more readable
          autoSkip: true, // Skip labels if there are too many to fit
        },
        grid: {
          display: false, // Optionally hide the grid lines for cleaner look
        }
      },
      y: {
        ticks: {
          display: false, // Hide the y-axis labels
        },
        grid: {
          display: true, // Optionally show grid lines for the y-axis
        }
      }
    }
  };

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Progress",
        data: data,
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
        tension: 0.2, // Adjust the tension for smoothness
      }
    ]
  };

  return (
    <div className="border-2 p-4 w-[50%] m-2 mx-auto">
      <Line 
      className="h-[100%] w-[100%]"
      options={options} data={chartData} />
    </div>
  );
}

export default Linegraph;
