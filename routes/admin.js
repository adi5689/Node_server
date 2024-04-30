// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const {roleCheck} = require('../middleware/roleCheck');

router.put('/patients/:id/approve-and-assign', roleCheck(['admin']),adminController.approvePatientAndAssignAgent);

module.exports = router;
