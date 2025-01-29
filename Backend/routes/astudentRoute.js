const express = require('express');
const router = express.Router();
const StudentDetails = require('../Schema/StudentDetails');
const moment = require('moment');

// Route to add a new student
router.post('/add', async (req, res) => {
    console.log("I am in addStudentRoute.js");
    console.log(req.body);

    try {
        // Create a new student instance
        const newStudent = new StudentDetails({
            uid: req.body.uid,
            name: req.body.name,
            className: req.body.className.toUpperCase(),
            guardianPhone: req.body.guardianPhone,
            guardianEmail: req.body.guardianEmail,
            password: req.body.password,
            dob: moment(req.body.dob, 'DD-MM-YYYY').toDate(),
            address: req.body.address,
            gender: req.body.gender
        });
        console.log(newStudent)
        // Validate the new student
        await newStudent.validate();

        // Save the new student
        const savedStudent = await newStudent.save();
        res.json(savedStudent);
        
    } catch (error) {
        // Handle validation or server errors
        console.log(error.message)
        res.status(500).json({ message: error.message });
    }
});

// Route to get all students
router.get('/all', async (req, res) => {
    try {
        // Get all students
        const students = await StudentDetails.find();
        res.json(students);
    } catch (error) {
        // Handle server errors
        res.status(500).json({ message: error.message });
    }
});

// Route to update a student
router.post('/update', async (req, res) => {
    try {
        // Find the student by id
        console.log("I am in updateStudentRoute.js");
        console.log(req.body)

        const student = await StudentDetails
            .findById(req.body._id)
            .exec();

        // console.log(student)
        // Update the student
        // student.uid = req.body.uid;
        student.name = req.body.name;
        student.className = req.body.className;
        student.guardianPhone = req.body.guardianPhone;
        student.guardianEmail = req.body.guardianEmail;
        student.password = req.body.password;
        student.dob = moment(req.body.dob, 'DD-MM-YYYY').toDate();
        student.address = req.body.address
        student.gender = req.body.gender 

        // console.log(Number(req.body.guardianPhone))
        // console.log(student)
        // Validate the updated student
        await student.validate();

        // Save the updated student
        const updatedStudent = await student.save();
        res.json(updatedStudent);
    } catch (error) {
        // Handle validation or server errors
        res.status(500).json({ message: error.message });
    }
});

router.post('/delete', async (req, res) => {
    console.log("I am in deleteStudentRoute.js");
    try {
        // Find the student by id
        const student = await StudentDetails
            .findById(req.body._id)
            .exec();

        // Delete the student
        const deletedStudent = await StudentDetails.findOneAndDelete({ _id: req.body._id });
        res.json(deletedStudent);
    } catch (error) {
        // Handle server errors
        res.status(500).json({ message: error.message });
    }
});

// Route to get all students in a specific class
router.post('/class', async (req, res) => {
    try {
        const className = req.body.className.toUpperCase();
        // Get all students in the specified class
        const students = await StudentDetails.find({ className });
        res.json(students);
    } catch (error) {
        // Handle server errors
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;