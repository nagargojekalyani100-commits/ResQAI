const express = require("express");

const router = express.Router();

const {
  createVolunteer,
  getVolunteers,
  deleteVolunteer,
} = require("../controllers/volunteerController");

router.post("/volunteer", createVolunteer);

router.get("/volunteers", getVolunteers);

router.delete("/volunteer/:id", deleteVolunteer);

module.exports = router;