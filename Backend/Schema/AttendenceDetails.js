const mongoose = require('mongoose');

// Define the schema for the attendence details
const model = new mongoose.Schema({
    student_id: { type: String, required: [true, "student_id is required"] }, // Student ID
    name: { type: String, required: [true, "name is required"] }, // Student Name
    className: { type: String, required: [true, "class is required"] }, // Class ID
    classTeacher: { type: String, required: [true, "classTeacher is required"] }, // Class Teacher
    classTeacher_id: { type: String, required: [true, "classTeacher_id is required"] }, // Class Teacher ID
    date: { type: Date, required: [true, "date is required"] }, // Date on which the attendence is marked
    status: { type: String, required: [true, "status is required"], enum: ["Absent", "Present"] } // Status of the attendence (Present/Absent)
});

module.exports = mongoose.model('attendence_details', model); // Create a Mongoose model based on the schema