// routes/patientRoutes.js
const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const {roleCheck} = require('../middleware/roleCheck');
const authMiddleware = require('../middleware/auth');


router.post('/detailedreport', authMiddleware, roleCheck(['patient']), patientController.createPatient);
router.get('/patientdetails/:id',authMiddleware, roleCheck(['agent', 'patient','admin']), patientController.getPatientDetails);


module.exports = router;
