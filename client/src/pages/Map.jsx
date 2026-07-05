import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import MapView from "../components/MapView";

function Map() {
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

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          🗺 Disaster Map
        </h1>

        <MapView reports={reports} />
      </div>
    </div>
  );
}

export default Map;