const Report = require("../models/Report");
const { analyzeDisaster } = require("../services/aiService");
const geocoder = require("../services/geocoder");
const sendEmergencyEmail = require("../services/emailService");
// CREATE REPORT + AI ANALYSIS

exports.createReport = async (req, res) => {
  try {
    const reportData = req.body;

    // Geocoding
    let latitude = 20.5937;
    let longitude = 78.9629;

    try {
      const geoResult = await geocoder.geocode(reportData.location);


      if (geoResult.length > 0) {
        latitude = geoResult[0].latitude;
        longitude = geoResult[0].longitude;
      }
    } catch (err) {
      console.log("Geocoding failed:", err.message);
    }

    reportData.latitude = latitude;
    reportData.longitude = longitude;

    // AI Analysis
    const aiResult = await analyzeDisaster(reportData);

reportData.aiAnalysis = aiResult;

// Save to MongoDB FIRST
const report = await Report.create(reportData);

// Send email after saving
try {
    await sendEmergencyEmail(reportData, aiResult);
    console.log("✅ Email function completed");
} catch (err) {
    console.log("❌ Email failed:", err.message);
}

    res.status(201).json({
      success: true,
      report,
      aiAnalysis: aiResult,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// GET ALL REPORTS
exports.getReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reports,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.deleteReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    res.json({
      success: true,
      message: "Report deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};