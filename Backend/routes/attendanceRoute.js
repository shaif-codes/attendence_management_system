const express = require('express');
const router = express.Router();

const AttendanceDetails = require('../Schema/AttendenceDetails');
const moment = require('moment');

// Route to add a new attendance

router.post('/submit', async (req, res) => {
    console.log("I am in addAttendanceRoute.js");
    console.log(req.body.student);

    try {
        // Loop through each student in the request body
        for (const student of Object.values(req.body.students)) {
            // Create a new attendance instance
            // console.log(student);
            const newAttendance = new AttendanceDetails({
                student_id: student.student_id,
                name: student.name,
                className: student.className,
                classTeacher: student.classTeacher,
                classTeacher_id: student.classTeacher_id,
                date: student.date,
                status: student.status
            });
            console.log('after insting data')
            console.log(newAttendance)
            // Validate the new attendance
            await newAttendance.validate();

            // Save the new attendance
            const savedAttendance = await newAttendance.save();
            console.log(savedAttendance);
        }

        res.json({ message: "Attendance added successfully" });

    } catch (error) {
        // Handle validation or server errors
        console.log(error.message)
        res.status(500).json({ message: error.message });
    }
});

// Route to check attendance marked for current day by specific teacher
router.get('/check-attendance', async (req, res) => {
    try {
        const teacherId = req.query.teacherId;
        const currentDate = moment().format('YYYY-MM-DD');

        // Find attendance marked by specific teacher for current date
        const attendance = await AttendanceDetails.findOne({
            classTeacher_id: teacherId,
            date: currentDate
        });

        // Send true if attendance is marked, false otherwise
        res.json({ attendanceMarked: !!attendance });
    } catch (error) {
        // Handle server errors
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 