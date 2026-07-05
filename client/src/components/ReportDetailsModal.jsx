function ReportDetailsModal({ report, onClose }) {
  if (!report) return null;

  const ai = report.aiAnalysis || {};

console.log("AI Analysis:", ai);
console.log("Risk Level:", ai.riskLevel);

  const getRiskColor = (risk) => {
    switch (risk) {
      case "LOW":
        return "bg-green-500";
      case "MEDIUM":
        return "bg-yellow-500";
      case "HIGH":
        return "bg-orange-500";
      case "CRITICAL":
        return "bg-red-600";
      default:
        return "bg-gray-500";
    }
  };


  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl w-11/12 max-w-3xl p-8 relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl font-bold"
        >
          ✖
        </button>

        <h2 className="text-3xl font-bold text-blue-600 mb-6">
          Disaster Report Details
        </h2>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <p><b>Disaster:</b> {report.disasterType}</p>
            <p><b>Location:</b> {report.location}</p>
            <p><b>People Affected:</b> {report.peopleAffected}</p>
            <p><b>Description:</b></p>

            <div className="bg-gray-100 p-3 rounded mt-2">
              {report.description}
            </div>
          </div>

          <div>

            <p className="mb-3">
              <b>Risk Level:</b>

              <span
                className={`${getRiskColor(
                  ai.riskLevel
                )} text-white px-3 py-1 rounded ml-3`}
              >
                {ai.riskLevel}
              </span>

            </p>

            <p className="mb-3">
              <b>Risk Score:</b> {ai.riskScore}
            </p>

            <p className="mb-3">
              <b>Summary:</b>
            </p>

            <div className="bg-blue-50 p-3 rounded">
              {ai.summary}
            </div>

          </div>

        </div>

        <div className="mt-6">

          <h3 className="text-xl font-bold mb-3">
            Recommended Actions
          </h3>

          <ul className="list-disc pl-6 space-y-2">

            {ai.actions &&
              ai.actions.map((action, index) => (
                <li key={index}>{action}</li>
              ))}

          </ul>

        </div>

        <div className="mt-6 bg-red-100 border border-red-400 rounded-lg p-4">

          <h3 className="font-bold text-red-700">
            🚨 Emergency Message
          </h3>

          <p>{ai.emergencyMessage}</p>

        </div>

      </div>

    </div>
  );
}

export default ReportDetailsModal;