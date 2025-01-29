import React from 'react';
import Header from '../Common/Header';
import { useLocation } from 'react-router-dom';

const StudentDashboard = () => {
    const location = useLocation();
    const student = location.state?.student;

    if (!student) {
        return <div>No student data available</div>;
    }

    const [details] = student;
    console.log(student);
    console.log(student.name);
    
    const studentName = details.name;
    const studentUid = details.uid;
    // const studentClass = details.class;

    const studentLinks = [
        { to: "/student/dashboard", text: "Dashboard", icon: "bx bxs-dashboard", current: true },
        { to: "/student/timetable", text: "Timetable", icon: "bx bx-calendar", current: false },
        { to: "/student/profile", text: "Profile", icon: "bx bx-user", current: false }
    ];

    return (
        <div className="student-dashboard">
            {/* Header (Side Navbar) */}

            <Header links={studentLinks} userDetails = {{name: studentName, uid: studentUid}} />   {/* Pass the user details as props */}

            {/* Content Section */}
            <div className="student-content">
                {/* Today's Timetable Section */}
                <div className="today-timetable">
                    {/* Display Today's Timetable */}
                    {/* Add Card View for Each Class */}
                </div>

                {/* Total Attendance of Each Subject Section */}
                <div className="total-attendance">
                    {/* Display Total Attendance of Each Subject */}
                    {/* Add Card View for Each Subject */}
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
