import React, { useState, useEffect } from "react";
import Header from "../Common/Header";
import { useLocation } from "react-router-dom";
import "./TeacherDashboard.css"; // Import CSS file for styling

const TeacherDashboard = () => {
    const { teacher } = useLocation().state;
    const [details] = teacher;
    const teacherName = details.name;
    const teacherUid = details.uid;
    const teacherClass = details.classTeacherOf;
    const teacherId = details._id;
    const teacherLinks = [
        { to: "/teacher", icon: "bx bx-home", text: "Home" },
        { to: "/teacher", icon: "bx bx-book-reader", text: "Classes" },
        { to: "/teacher", icon: "bx bx-check-double", text: "Attendance" },
        // Add more links as needed
    ];
    const [attendanceSubmitted, setAttendanceSubmitted] = useState(false);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const getStudents = async () => {
            try {
                const response = await fetch('/astudent/class/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ className: teacherClass })
                });
                const data = await response.json();
                const studentsWithPresentState = data.map(student => ({ ...student, present: true }));
                setStudents(studentsWithPresentState);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        getStudents();
    }, [teacherClass]);

    const handleToggleSwitch = (index) => {
        const updatedStudents = [...students];
        updatedStudents[index].present = !updatedStudents[index].present;
        setStudents(updatedStudents);
    };

    const onSubmitAttendance = async () => {
        const submittedStudents = students.map(student => ({
            student_id: student._id,
            name: student.name,
            className: student.className,
            classTeacher: teacherName,
            classTeacher_id: teacherId,
            date: new Date(),
            status: student.present ? 'Present' : 'Absent'
        }));
        try {
           const response = await fetch('/attendance/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ students: submittedStudents })
            });
            
            if (response.ok) {
                setAttendanceSubmitted(true); // Mark attendance as submitted
                alert("Attendance marked successfully");
            }
        } catch (error) {
            console.error('Error submitting attendance:', error);
        }
    };


    return <>
        <Header links={teacherLinks} userDetails={{ name: teacherName, uid: teacherUid }} />
        <div className="teacher-container container mt-4">
            <h2>Students in Your Class</h2>
            <table className="table mt-3 custom-table">
                <thead>
                    <tr>
                        <th>Roll Number</th>
                        <th>UID</th>
                        <th>Name</th>
                        <th>Attendance</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={index} className={student.present ? "" : "table-danger"}> {/* Apply danger class based on attendance */}
                            <td>{index + 1}</td>
                            <td>{student.uid}</td>
                            <td>{student.name}</td>
                            <td>
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`attendance_${index}`}
                                        checked={student.present}
                                        onChange={() => handleToggleSwitch(index)}
                                        disabled={attendanceSubmitted}
                                    />
                                    <label className="form-check-label" htmlFor={`attendance_${index}`}></label>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button
                className="btn btn-primary"
                onClick={onSubmitAttendance}
                disabled={attendanceSubmitted} // Disable button if attendance is already submitted
            >
                {attendanceSubmitted ? "Attendance Submitted" : "Submit Attendance"}
            </button>
        </div>
    </>
    
};

export default TeacherDashboard;
