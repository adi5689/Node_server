// controllers/patientController.js
const Patient = require("../models/patient");
const AgentPatientAssignment = require("../models/agentPatientAssignment");
const { Op } = require("sequelize");

exports.createPatient = async (req, res) => {
  try {
    const userId = req.user.id;
    const patient = await Patient.create({
      ...req.body,
      userId: userId,
    });
    res
      .status(201)
      .json({ message: "Patient report created successfully", patient });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// controllers/patientController.js
exports.getPatientDetails = async (req, res) => {
  try {
    // Find the assignment record for the current user (either agent or patient) and the patient
    const assignment = await AgentPatientAssignment.findOne({
      where: {
        [Op.or]: [
          { agentId: req.user.id },
          { patientId: req.user.id },
        ],
        patientId: req.params.id,
      },
    });

    // If no assignment is found, check if the current user is the patient who created the details
    if (!assignment) {
      const patient = await Patient.findByPk(req.user.id);
      if (!patient || patient.id !== req.params.id) {
        if (req.user.role !== "admin") {
          return res.status(403).json({ error: "Access denied" });
        }
      }
    }

    // Ensure the patient is approved
    const patientDetails = await Patient.findByPk(req.params.id);
    if (!patientDetails.isApproved) {
      return res.status(403).json({ error: "Patient details not approved" });
    }

    // Return the patient details
    res.json(patientDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
