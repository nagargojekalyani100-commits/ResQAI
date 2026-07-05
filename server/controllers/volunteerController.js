const Volunteer = require("../models/Volunteer");

// Register Volunteer
exports.createVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.create(req.body);

    res.status(201).json({
      success: true,
      volunteer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Volunteers
exports.getVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      volunteers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Volunteer
exports.deleteVolunteer = async (req, res) => {
  try {
    await Volunteer.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Volunteer Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};