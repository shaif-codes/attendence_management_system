const express = require('express');
const router = express.Router();
const StudentDetails = require('../Schema/StudentDetails');

router.get('/', async (req, res) => {
    // console.log("ha bhai routes me agya")
    try {
        const studentCount = await StudentDetails.countDocuments();
        res.json({ count: studentCount });
    } catch (error) {
        console.error("Error occurred while fetching student count:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
