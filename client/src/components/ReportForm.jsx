import { useState } from "react";
import axios from "axios";
import AIResult from "./AIResult";

function ReportForm() {
  const [formData, setFormData] = useState({
    disasterType: "",
    location: "",
    description: "",
    peopleAffected: "",
  });

  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axios.post(
  "https://resqai-azyw.onrender.com/api/report",
  formData
);

console.log("========== BACKEND RESPONSE ==========");
console.log(response.data);
console.log("AI Analysis:", response.data.aiAnalysis);
console.log("======================================");

setAiResult(response.data.aiAnalysis);

// Wait 2 seconds before showing the alert
setTimeout(() => {
  alert("Report Submitted Successfully!");
}, 2000);

      // setFormData({
      //   disasterType: "",
      //   location: "",
      //   description: "",
      //   peopleAffected: "",
      // });

    } catch (error) {
      console.error(error);
      alert("Failed to submit report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-md max-w-2xl mx-auto">

        <h2 className="text-2xl font-bold mb-6 text-blue-600">
          📢 Report a Disaster
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block mb-2 font-semibold">
              Disaster Type
            </label>

            <select
              name="disasterType"
              value={formData.disasterType}
              onChange={handleChange}
              className="w-full border border-gray-400 p-3 rounded-lg bg-white"
              required
            >
              <option value="">Select Disaster</option>
              <option value="Flood">Flood</option>
              <option value="Fire">Fire</option>
              <option value="Earthquake">Earthquake</option>
              <option value="Cyclone">Cyclone</option>
              <option value="Landslide">Landslide</option>
              <option value="Accident">Accident</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Location
            </label>

            <input
              type="text"
              name="location"
              placeholder="Enter Location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border border-gray-400 p-3 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Description
            </label>

            <textarea
              rows="5"
              name="description"
              placeholder="Describe the disaster..."
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-400 p-3 rounded-lg"
              required
            ></textarea>
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Estimated People Affected
            </label>

            <input
              type="number"
              name="peopleAffected"
              placeholder="Number of People"
              value={formData.peopleAffected}
              onChange={handleChange}
              className="w-full border border-gray-400 p-3 rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full"
          >
            {loading ? "🤖 AI is Analyzing..." : "Submit Report"}
          </button>

        </form>

      </div>

      {aiResult && (
        <div className="max-w-2xl mx-auto mt-8">
          <AIResult result={aiResult} />
        </div>
      )}
    </>
  );
}

export default ReportForm;