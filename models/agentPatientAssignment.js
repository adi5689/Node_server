// models/agentPatientAssignment.js
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); 
const User = require('../models/user');

const AgentPatientAssignment = sequelize.define('AgentPatientAssignment', {
 // Foreign keys to reference the User (agent) and Patient
 agentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // This should match the table name of your User model
      key: 'id'
    }
 },
 patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'patients', // This should match the table name of your Patient model
      key: 'id'
    }
 },
 // Additional fields for tracking assignment status and other details
 status: {
    type: DataTypes.ENUM('pending', 'approved', 'completed'),
    allowNull: false,
    defaultValue: 'pending'
 },
 assignedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
 },
 completedAt: {
    type: DataTypes.DATE,
    allowNull: true
 }
}, {
 tableName: 'agent_patient_assignments',
 timestamps: true,
 createdAt: 'created_at',
 updatedAt: 'updated_at'
});

// Associations
User.belongsToMany(User, {
    as: 'approvedAgents',
    through: AgentPatientAssignment,
    foreignKey: 'patientId',
    otherKey: 'agentId'
   });

   User.belongsToMany(User, {
    as: 'approvedPatients',
    through: AgentPatientAssignment,
    foreignKey: 'agentId',
    otherKey: 'patientId'
   });
module.exports = AgentPatientAssignment;
