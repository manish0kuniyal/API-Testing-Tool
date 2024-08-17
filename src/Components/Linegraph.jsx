import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
} from "chart.js";

// Corrected syntax
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend
);

function Linegraph() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sales Over Six Months',
      },
    },
  };

  const fakeChartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales",
        data: [500, 750, 300, 900, 650, 1200],
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
      }
    ]
  };

  return (
    <div className="w-full max-w-lg mx-auto ">
      <Line
        className="border-2 border-red-400 rounded-xl p-4"
        options={options}
        data={fakeChartData}
      />
    </div>
  );
}

export default Linegraph;
