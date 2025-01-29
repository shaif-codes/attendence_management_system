const mongoose = require('mongoose');

// Define the schema for teacher details
const teacherSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    classTeacherOf: {
        type: String,
        required: true
    },
    // subjects: {
    //     type: [String], // Assuming subjects is an array of strings
    //     default: []
    // },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Create a model for the teacher details schema
const TeacherDetails = mongoose.model('teacher_details', teacherSchema);

module.exports = TeacherDetails;
