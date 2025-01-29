const mongoose = require('mongoose');

// Define the schema for the class details
const classSchema = new mongoose.Schema({
    className: { type: String, required: true, unique: true }, // Unique class ID
    startDate: { type: Date, required: true }, // Start date of the class
    classTeacher: { type: String, required: true, unique: true} // Name of the class teacher
});

module.exports = mongoose.model('class_details', classSchema); // Create a Mongoose model based on the schema
