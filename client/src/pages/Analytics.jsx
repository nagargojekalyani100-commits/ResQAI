import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import AnalyticsChart from "../components/AnalyticsChart";

function Analytics() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await axios.get("https://resqai-azyw.onrender.com/api/reports");
      setReports(res.data.reports);
    } catch (error) {
      console.log(error);
    }
  };

  const totalReports = reports.length;

  const floodReports = reports.filter(
    (r) => r.disasterType === "Flood"
  ).length;

  const fireReports = reports.filter(
    (r) => r.disasterType === "Fire"
  ).length;

  const earthquakeReports = reports.filter(
    (r) => r.disasterType === "Earthquake"
  ).length;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-8">

        <h1 className="text-3xl font-bold text-blue-600 mb-8">
          📊 Analytics Dashboard
        </h1>

        <div className="grid grid-cols-4 gap-6">

          <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg">Total Reports</h3>
            <p className="text-4xl font-bold">{totalReports}</p>
          </div>

          <div className="bg-cyan-600 text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg">Flood</h3>
            <p className="text-4xl font-bold">{floodReports}</p>
          </div>

          <div className="bg-red-600 text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg">Fire</h3>
            <p className="text-4xl font-bold">{fireReports}</p>
          </div>

          <div className="bg-yellow-500 text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg">Earthquake</h3>
            <p className="text-4xl font-bold">
              {earthquakeReports}
            </p>
          </div>

        </div>

        <AnalyticsChart reports={reports} />

      </div>
    </div>
  );
}

export default Analytics;