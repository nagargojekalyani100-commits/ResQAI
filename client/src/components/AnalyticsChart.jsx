import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function AnalyticsChart({ reports }) {
  const disasterCount = {
    Flood: 0,
    Fire: 0,
    Earthquake: 0,
    Cyclone: 0,
    Landslide: 0,
    Accident: 0,
  };

  reports.forEach((report) => {
    if (disasterCount.hasOwnProperty(report.disasterType)) {
      disasterCount[report.disasterType]++;
    }
  });

  const data = {
    labels: Object.keys(disasterCount),
    datasets: [
      {
        label: "Number of Reports",
        data: Object.values(disasterCount),
        backgroundColor: [
          "#3B82F6",
          "#EF4444",
          "#F59E0B",
          "#10B981",
          "#8B5CF6",
          "#6B7280",
        ],
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mt-8">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">
        📊 Disaster Statistics
      </h2>

      <Bar data={data} />
    </div>
  );
}

export default AnalyticsChart;