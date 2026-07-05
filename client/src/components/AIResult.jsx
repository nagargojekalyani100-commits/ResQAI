function AIResult({ result }) {
  console.log("AIResult received:", result);

  if (!result) return null;

  const getRiskColor = (level) => {
    switch (level) {
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
    <div className="mt-8 bg-white shadow-lg rounded-xl p-6 border">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">
        🤖 AI Disaster Analysis
      </h2>

      {/* Risk Level */}
      <div className="mb-5">
        <h3 className="font-semibold text-lg mb-2">Risk Level</h3>

        <span
          className={`${getRiskColor(
            result.riskLevel
          )} text-white px-4 py-2 rounded-lg font-bold`}
        >
          {result.riskLevel}
        </span>
      </div>

      {/* Risk Score */}
      <div className="mb-5">
        <h3 className="font-semibold text-lg">Risk Score</h3>

        <p className="text-3xl font-bold text-blue-700">
          {result.riskScore}/100
        </p>
      </div>

      {/* Summary */}
      <div className="mb-5">
        <h3 className="font-semibold text-lg mb-2">
          Summary
        </h3>

        <p className="text-gray-700">
          {result.summary}
        </p>
      </div>

      {/* Actions */}
      <div className="mb-5">
        <h3 className="font-semibold text-lg mb-2">
          Recommended Actions
        </h3>

        <ul className="list-disc pl-6 space-y-2">
          {result.actions &&
            result.actions.map((action, index) => (
              <li key={index}>{action}</li>
            ))}
        </ul>
      </div>

      {/* Emergency Message */}
      <div className="bg-red-100 border border-red-300 p-4 rounded-lg">
        <h3 className="font-bold text-red-700 mb-2">
          🚨 Emergency Message
        </h3>

        <p className="text-red-700">
          {result.emergencyMessage}
        </p>
      </div>
    </div>
  );
}

export default AIResult;