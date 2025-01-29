const express = require('express');
const router = express.Router();
const StudentDetails = require('../Schema/StudentDetails');
const AdminDetails = require('../Schema/AdminDetails');
const TeacherDetails = require('../Schema/TeacherDetails');

router.post('/validation', async (req, res) => {
    try {
        const { uid, password, loginOption } = req.body;
        console.log(`${uid}, ${password}`);

        if(loginOption === 'admin') {
            let admin = await AdminDetails.find({ uid: uid, password: password });
            if (!admin.length) {
                console.log("Invalid login credentials");
                return res.status(401).json({ message: 'Invalid login credentials' });
            }

            console.log("Login Success");
            res.status(200).json({ message: "Login Success", admin });
        }

        else if(loginOption === 'teacher') {
            let teacher = await TeacherDetails.find({ uid: uid, password: password });
            if (!teacher.length) {
                console.log("Invalid login credentials");
                return res.status(401).json({ message: 'Invalid login credentials' });
            }

            console.log("Login Success");
            res.status(200).json({ message: "Login Success", teacher });
        }


        else if(loginOption === 'student'){
            let student = await StudentDetails.find({ uid: uid, password: password });
            if (!student.length) {
                console.log("Invalid login credentials");
                return res.status(401).json({ message: 'Invalid login credentials' });
            }

            console.log("Login Success");
            res.status(200).json({ message: "Login Success", student });
        }
            
    } catch (error) {
        console.error("Error occurred during login:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
