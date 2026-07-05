const express = require("express");

const router = express.Router();

const {
  createReport,
  getReports,
  deleteReport,
} = require("../controllers/reportController");

router.post("/report", createReport);

router.get("/reports", getReports);

router.delete("/report/:id", deleteReport);

module.exports = router;