// Load environment variables FIRST
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");

// Database
const connectDB = require("./config/db");

// Routes
const reportRoutes = require("./routes/reportRoutes");
const volunteerRoutes = require("./routes/volunteerRoutes");
const weatherRoutes = require("./routes/weatherRoutes");

// AI Service
const { analyzeDisaster } = require("./services/aiService");


// Connect Database
connectDB();

// Create Express App
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", reportRoutes);
app.use("/api", volunteerRoutes);
app.use("/api", weatherRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("🚀 ResQAI Backend is Running...");
});

// AI Test Route
app.get("/test-ai", async (req, res) => {
  try {
    const sampleReport = {
      disasterType: "Flood",
      location: "Mumbai",
      description: "Severe flooding in low lying areas",
      peopleAffected: 500,
    };

    const result = await analyzeDisaster(sampleReport);

    console.log("AI RESULT:", result);

    res.json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});