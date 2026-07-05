const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    disasterType: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    peopleAffected: {
      type: Number,
      required: true,
    },

    latitude: {
      type: Number,
    },

    longitude: {
      type: Number,
    },

    aiAnalysis: {
      riskLevel: {
        type: String,
      },

      riskScore: {
        type: Number,
      },

      summary: {
        type: String,
      },

      actions: [
        {
          type: String,
        },
      ],

      emergencyMessage: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Report", reportSchema);