"use client";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PerformanceSection = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
    scales: {
      y: {
        min: 40,
        max: 100,
      },
    },
  };

  const labels = [
    "First Term",
    "2nd Quarter",
    "Half Yearly",
    "3rd Quarter",
    "Final",
  ];

  const data = {
    labels,
    datasets: [
      {
        data: [65, 59, 80, 81, 56],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        tension: 0.4,
      },
      {
        data: [70, 72, 68, 75, 82],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Performance</h2>
        <select className="text-sm px-2 py-1">
          <option>2024 - 2025</option>
        </select>
      </div>
      <div className="border-b border-gray-200 -mx-6 mb-4"></div>
      <div className="w-full h-64">
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default PerformanceSection;