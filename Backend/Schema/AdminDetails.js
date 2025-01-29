const mongoose = require('mongoose');

// Define the schema for the admin details
const model = new mongoose.Schema({
    uid: { type: String, required: [true, "uid is required"] }, // Registration Number
    password: { type: String, required: [true, "password is required"] }, // Password
});

module.exports = mongoose.model('admin_details', model); // Create a Mongoose model based on the schema