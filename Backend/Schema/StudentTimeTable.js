const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
    section: { type: String, unique: true }, // Unique section identifier
    timetable: [{
        dayOfWeek: String, // Day of the week (e.g., Monday, Tuesday, etc.)
        timeSlot: String, // Time slot for the class (e.g., 9:00 AM - 10:00 AM)
        subject: String, // Subject of the class
        teacher: String // Teacher of the class
    }]
});

const StudentTimetable = mongoose.model('Timetable', timetableSchema);

module.exports = StudentTimetable;
