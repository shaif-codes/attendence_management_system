const mongoose = require('mongoose');

// Define the schema for the student details
const model = new mongoose.Schema({
    uid: { type: String, unique: true, required: true }, // Unique registration number
    name: {type: String, required: true}, // Name of the student
    className: { type: String, required: true }, // Class of the student
    guardianPhone: { type: Number, required: true }, // Phone number of the guardian
    guardianEmail: { type: String}, // Email address of the guardian
    password: String, // Password for authentication
    dob: { type: Date, required: true }, // Date of birth of the student
    address: { type: String, required: true }, // Address of the student
    gender: { type: String, required: true }, //student gender
});

// Create a Mongoose model based on the schema
const StudentDetails = mongoose.model('student_details', model);

module.exports = StudentDetails