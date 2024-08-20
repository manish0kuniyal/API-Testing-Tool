import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import { fakeProgressData } from "./Data"; // Import the fake data

function Bargraph({ data = fakeProgressData }) { // Accept `data` as a prop, default to `fakeProgressData`
  const days = data.length; // Number of days is the length of the data array
  const labels = Array.from({ length: days }, (_, i) => `Day ${i + 1}`);

  const colors = data.map((value) => value >= 0 ? "hsl(120, 70%, 50%)" : "hsl(0, 70%, 50%)");

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
  };

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Progress",
        data: data,
        backgroundColor: colors,
        borderColor: colors.map(color => color.replace("70%", "90%")),
        borderWidth: 1,
      }
    ]
  };

  return  <div className="border-2 p-4 w-[30%] m-2 mx-auto">
  <Bar options={options} data={chartData} />;
  </div>
}

export default Bargraph;
