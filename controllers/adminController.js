const Patient = require('../models/patient');
const User = require('../models/user');
const AgentPatientAssignment = require('../models/agentPatientAssignment');

exports.approvePatientAndAssignAgent = async (req, res) => {
    try {
       const patientId = req.params.id;
       console.log(patientId);
       const agentId = req.body.agentId; // Assuming agentId is sent in the request body
   
       // Find the patient and agent
       const patient = await Patient.findByPk(patientId);
       const agent = await User.findByPk(agentId);
   
       if (!patient) {
           return res.status(404).json({ error: 'Patient not found' });
       }
       if (!agent) {
           return res.status(404).json({ error: 'Agent not found' });
       }
       if (agent.role !== 'agent') {
           return res.status(400).json({ error: 'User is not an agent' });
       }
   
       // Approve the patient
       await patient.update({ isApproved: true });
   
       // Assign the agent to the patient
       await AgentPatientAssignment.create({
           agentId: agent.id,
           patientId: patient.userId,
           status: 'approved'
       });
   
       res.json({ message: 'Patient approved and agent assigned successfully', patient, agent });
    } catch (error) {
       res.status(500).json({ error: error.message });
    }
   };
   