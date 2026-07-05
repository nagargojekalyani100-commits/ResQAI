import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import ReportDetailsModal from "../components/ReportDetailsModal";

function Admin() {
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/reports");
      setReports(res.data.reports);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteReport = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this report?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/report/${id}`);

      alert("Report Deleted Successfully");

      fetchReports();
    } catch (error) {
      console.log(error);
      alert("Failed to delete report");
    }
  };

  const filteredReports = reports.filter((report) => {
    const matchLocation = report.location
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchType =
      filter === "All" || report.disasterType === filter;

    return matchLocation && matchType;
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-8">

        <h1 className="text-3xl font-bold text-blue-600 mb-8">
          👨‍💼 Admin Dashboard
        </h1>

        <div className="flex gap-4 mb-6">

          <input
            type="text"
            placeholder="Search Location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-3 rounded-lg w-72"
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border p-3 rounded-lg"
          >
            <option>All</option>
            <option>Flood</option>
            <option>Fire</option>
            <option>Earthquake</option>
            <option>Cyclone</option>
            <option>Landslide</option>
            <option>Accident</option>
          </select>

        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">

          <table className="w-full">

            <thead className="bg-blue-600 text-white">

              <tr>
                <th className="p-4">Type</th>
                <th className="p-4">Location</th>
                <th className="p-4">People</th>
                <th className="p-4">Date</th>
                <th className="p-4">Action</th>
              </tr>

            </thead>

            <tbody>

              {filteredReports.map((report) => (

                <tr
                  key={report._id}
                  className="border-b hover:bg-gray-100"
                >
                  <td className="p-4">{report.disasterType}</td>

                  <td className="p-4">{report.location}</td>

                  <td className="p-4">
                    {report.peopleAffected}
                  </td>

                  <td className="p-4">
                    {new Date(
                      report.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-4">

                    <button
  onClick={() => setSelectedReport(report)}
  className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded mr-2"
>
  View
</button>
                    <button
                      onClick={() =>
                        deleteReport(report._id)
                      }
                      className="bg-red-600 text-white px-3 py-2 rounded"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
        {selectedReport && (
  <ReportDetailsModal
    report={selectedReport}
    onClose={() => setSelectedReport(null)}
  />
)}

      </div>
    </div>
  );
}

export default Admin;