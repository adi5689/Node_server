// controllers/userController.js
const User = require('../models/user');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
 try {
    const hashedPassword = await argon2.hash(req.body.password);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role
    });
    res.status(201).json({ message: 'User created successfully', user });
 } catch (error) {
    res.status(500).json({ error: error.message });
 }
};

exports.login = async (req, res) => {
 try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const validPassword = await argon2.verify(user.password, req.body.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user });
 } catch (error) {
    res.status(500).json({ error: error.message });
 }
};

exports.getAgents = async (req, res) => {
    try {
       const agents = await User.findAll({ where: { role: 'agent' } });
       res.json(agents);
    } catch (error) {
       res.status(500).json({ error: error.message });
    }
};

exports.getPatients = async (req, res) => {
    try {
       const patients = await User.findAll({ where: { role: 'patient' } });
       res.json(patients);
    } catch (error) {
       res.status(500).json({ error: error.message });
    }
};

// controllers/userController.js
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the user making the request is an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Forbidden: Only admins can delete users' });
        }

        // Delete the user
        await user.destroy();

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



   