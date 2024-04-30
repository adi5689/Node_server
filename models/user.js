// models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Patient = require('./patient');

const User = sequelize.define('User', {
 id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
 },
 name: {
    type: DataTypes.STRING,
    allowNull: false
 },
 email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
 },
 password: {
    type: DataTypes.STRING,
    allowNull: false
 },
 role: {
    type: DataTypes.ENUM('admin', 'agent', 'patient'),
    allowNull: false
 }
}, {
 tableName: 'users',
 timestamps: true,
 createdAt: 'created_at',
 updatedAt: 'updated_at'
});


module.exports = User;
