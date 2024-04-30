// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {roleCheck} = require('../middleware/roleCheck');
const authMiddleware = require('../middleware/auth');



router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/agents', roleCheck(['admin']), userController.getAgents);
router.get('/patients', roleCheck(['admin']), userController.getPatients);
router.delete('/delete/:id', authMiddleware, roleCheck(['admin']), userController.deleteUser);


module.exports = router;
