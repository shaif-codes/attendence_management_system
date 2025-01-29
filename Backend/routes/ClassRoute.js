const express = require('express');
const router = express.Router();
const ClassDetails = require('../Schema/ClassDetails');
const moment = require('moment');

// Route to add a new class
router.post('/add', async (req, res) => {
    console.log("I am in addClassRoute.js");
    console.log(req.body);

    try {
        // Create a new class instance
        const newClass = new ClassDetails({
            className: (req.body.className).toUpperCase(),
            startDate: moment(req.body.startDate, 'DD-MM-YYYY').toDate(),
            classTeacher: req.body.classTeacher
        });
        console.log(newClass)
        // Validate the new class
        await newClass.validate();

        // Save the new class
        const savedClass = await newClass.save();
        res.json(savedClass);
    } catch (error) {
        // Handle validation or server errors
        console.log(error.message)
        res.status(500).json({ message: error.message });
    }
});

// Route to get all classes
router.get('/all', async (req, res) => {
    try {
        // Get all classes
        const allClasses = await ClassDetails.find();
        res.json(allClasses);
    } catch (error) {
        // Handle server errors
        res.status(500).json({ message: error.message });
    }
});

router.post('/update', async (req, res) => {
    try {
        // Find the class to be updated
        const classToUpdate = await ClassDetails
            .findOne({ _id: req.body._id })
            .exec();
        if (!classToUpdate) {
            return res.status(404).json({ message: 'Class not found' });
        }

        // Update the class details

        classToUpdate.className = req.body.className;
        classToUpdate.startDate = moment(req.body.startDate, 'DD-MM-YYYY').toDate();
        classToUpdate.classTeacher = req.body.classTeacher;

        // Validate the updated class
        await classToUpdate.validate();

        // Save the updated class
        const updatedClass = await classToUpdate.save();
        res.json(updatedClass);
    } catch (error) {
        // Handle validation or server errors
        res.status(500).json({ message: error.message });
    }
});

router.post('/delete', async (req, res) => {
    console.log(req.body);
    try {
        // Find the class to be deleted
        const classToDelete = await ClassDetails
            .findOne({ _id: req.body._id })
            .exec();
        if (!classToDelete) {
            return res.status(404).json({ message: 'Class not found' });
        }

        // Delete the class

        await ClassDetails.findOneAndDelete({ _id: req.body._id });
        res.json({ message: 'Class deleted successfully' });
    } catch (error) {
        // Handle server errors
        res.status(500).json({ message: error.message });
    }
}
);



module.exports = router;
