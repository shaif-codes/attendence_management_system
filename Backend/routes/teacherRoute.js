const express = require('express');
const router = express.Router();
const TeacherDetails = require('../Schema/TeacherDetails');
// const moment = require('moment');

// Route to add a new teacher
router.post('/add', async (req, res) => {
    console.log("I am in addTeacherRoute.js");
    console.log(req.body);

    try {
        // Create a new teacher instance
        const newTeacher = new TeacherDetails({
            uid: req.body.uid,
            name: req.body.name,
            classTeacherOf: req.body.classTeacherOf.toUpperCase(),
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password
        });
        console.log(newTeacher)
        // Validate the new teacher
        await newTeacher.validate();

        // Save the new teacher
        const savedTeacher = await newTeacher.save();
        res.json(savedTeacher);
        
    } catch (error) {
        // Handle validation or server errors
        console.log(error.message)
        res.status(500).json({ message: error.message });
    }
});


// Route to get all teachers
router.get('/all', async (req, res) => {
    try {
        // Get all teachers
        const teachers = await TeacherDetails.find();
        res.json(teachers);
    } catch (error) {
        // Handle server errors
        res.status(500).json({ message: error.message });
    }
});

// Route to update a teacher
router.post('/update', async (req, res) => {
    try {
        // Find the teacher by id
        console.log("I am in updateTeacherRoute.js");
        console.log(req.body)

        const teacher = await TeacherDetails
            .findById(req.body._id)
            .exec();

        // Update the teacher details
        teacher.uid = req.body.uid;
        teacher.name = req.body.name;
        teacher.classTeacherOf = req.body.classTeacherOf.toUpperCase();
        teacher.email = req.body.email;
        teacher.phone = Number(req.body.phone);
        teacher.password = req.body.password;

        // Validate the updated teacher
        await teacher.validate();

        // Save the updated teacher
        const updatedTeacher = await teacher.save();
        res.json(updatedTeacher);
    } catch (error) {
        // Handle validation or server errors
        console.log(error.message)
        res.status(500).json({ message: error.message });
    }
});

// Route to delete a teacher
router.post('/delete', async (req, res) => {
    try {
        // Find the teacher by id and delete
        const deletedTeacher = await TeacherDetails
            .findByIdAndDelete(req.body._id)
            .exec();
        res.json(deletedTeacher);
    } catch (error) {
        // Handle server errors
        res.status(500).json({ message: error.message });
    }
}
    
    );

module.exports = router;