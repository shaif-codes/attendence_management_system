const express = require('express');
const router = express.Router();
const TeacherDetails = require('../Schema/TeacherDetails');

router.get('/', async (req, res) => {
    try {
        const teacherCount = await TeacherDetails.countDocuments();
        res.json({ count: teacherCount });
    } catch (error) {
        console.error("Error occurred while fetching teacher count:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
