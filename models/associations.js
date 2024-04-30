const User = require('./user');
const Patient = require('./patient');

// Define a one-to-one relationship between User and Patient
User.hasOne(Patient, {
 foreignKey: 'userId', // This is the column in the Patient table that references the User's id
 as: 'patient', // This is the alias you'll use to access the associated patient from a user
});

Patient.belongsTo(User, {
 foreignKey: 'userId', // This is the column in the Patient table that references the User's id
 as: 'user', // This is the alias you'll use to access the associated user from a patient
});