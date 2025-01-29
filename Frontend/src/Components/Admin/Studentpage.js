// StudentPage.js
import React, { useEffect, useState } from 'react';
import Header from '../Common/Header';
import AddStudentDialog from './AddStudentDialog';
import './StudentPage.css';
import { BsPlus, BsPencil, BsTrash } from 'react-icons/bs';
import { FaSave } from "react-icons/fa";
import DeleteStudentDialog from './DeleteStudentDialog';

const getStudents = async () => {
    const response = await fetch('/astudent/all');
    const data = await response.json();
    return data;
};

const StudentPage = () => {
    const [showAddStudentDialog, setShowAddStudentDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deleteStudentName, setDeleteStudentName] = useState('');
    const [deleteStudentId, setDeleteStudentId] = useState('');
    const [editStudentId, setEditStudentId] = useState('');
    const [editStudentUid, setEditStudentUid] = useState('');
    const [editStudentName, setEditStudentName] = useState('');
    const [editClassName, setEditClassName] = useState('');
    const [editGuardianPhone, setEditGuardianPhone] = useState('');
    const [editGuardianEmail, setEditGuardianEmail] = useState('');
    const [editPassword, setEditPassword] = useState('');
    const [editDob, setEditDob] = useState('');
    const [editAddress, setEditAddress] = useState('');
    const [editGender, setEditGender] = useState('');

    const [students, setStudents] = useState([]);

    useEffect(() => {
        getStudents().then(data => setStudents(data));
    }, [students]);

    const studentLinks = [
        { to: "/admin", icon: "bx bxs-dashboard", text: "Dashboard" },
        { to: "/adminClass", icon: "bx bx-book-reader", text: "Classes" },
        { to: "/adminStudent", icon: "bx bx-user", text: "Students", current: true },
        { to: "/adminTeacher", icon: "bx bx-chalkboard", text: "Teachers" }
    ];

    const formatDateString = (isoDateString) => {
        const date = new Date(isoDateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const handleDeleteStudent = (id, name) => {
        setDeleteStudentId(id);
        setDeleteStudentName(name);
        setShowDeleteDialog(true);
    };

    const handleToggleAddStudentDialog = () => {
        setShowAddStudentDialog(!showAddStudentDialog);
    };

    const handleDeleteConfirm = async (confirm) => {
        if (confirm){
            await fetch('/astudent/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ _id: deleteStudentId })
            }).then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.log(error));
            console.log(`id of studetn to be deleted: ${deleteStudentId}`)
            setStudents(students.filter((studentItem) => studentItem.id !== deleteStudentId));
        };
        setShowDeleteDialog(false);
    };

    const handleAddStudent = (newStudent) => {
        setStudents([...students, { id: students.length + 1, ...newStudent }]);
    };

    const handleEditToggle = (id) => {
        setEditStudentId(id);
        console.log(id)
        const studentToEdit = students.find(student => student._id === id);
        console.log(studentToEdit.uid)
        if (studentToEdit) {
            setEditStudentUid(studentToEdit.uid);
            setEditStudentName(studentToEdit.name);
            setEditClassName(studentToEdit.className);
            setEditGuardianPhone(studentToEdit.guardianPhone);
            setEditGuardianEmail(studentToEdit.guardianEmail);
            setEditPassword(studentToEdit.password);
            setEditDob(studentToEdit.dob);
            setEditAddress(studentToEdit.address);
            setEditGender(studentToEdit.gender);
        }
    };

    const handleSaveEdit = async () => {
        // Assuming you have a function to update student details on the server
        // Update the student details on the server using fetch or axios
        // After successful update, update the state to reflect the changes
        console.log(`id of studetn to be deleted: ${editStudentId}`)
        const studentIndex = students.findIndex((studentItem) => studentItem.id === editStudentId);
        const updatedStudents = [...students];
        updatedStudents[studentIndex] = {
            ...updatedStudents[studentIndex],  
            _id: editStudentId, 
            name: editStudentName,
            className: editClassName,
            guardianPhone: editGuardianPhone,
            guardianEmail: editGuardianEmail,
            password: editPassword,
            dob: editDob,
            address: editAddress,
            gender: editGender
        };

        console.log(updatedStudents[studentIndex])

        await fetch('/astudent/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedStudents[studentIndex])
        }).then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));
        

        setStudents(updatedStudents);
        // Close the edit form
        setEditStudentId('');
    };

    return (
        <div className="student-page">
            <Header links={studentLinks} activeLink="Students" userDetails={{ name: "Admin" }} />
            <div className="container student-page-container">
                <h2>Students</h2>
                <div className="text-center" style={{ position: "absolute", top: "17px", right: "80px" }} >
                    <button className="btn btn-primary" onClick={handleToggleAddStudentDialog}> <BsPlus /> Add Student</button>
                </div>
                <div className="row">
                    {/* Display student cards */}
                    {students.map((student) => (
                        <div key={student._id} className="col-lg-4 col-md-6 mb-4">
                            <div className="card student-card">
                                <div className="card-body">
                                    {editStudentId === student._id ? (
                                        <>
                                            {/* Render editing form fields */}
                                            <input type="text" className="form-control mb-2" value={editStudentName} onChange={(e) => setEditStudentName(e.target.value)} />
                                            <input type="text" className="form-control mb-2" value={editStudentUid} onChange={(e) => setEditStudentUid(e.target.value)} />
                                            <input type="text" className="form-control mb-2" value={editClassName} onChange={(e) => setEditClassName(e.target.value)} />
                                            <input type="text" className="form-control mb-2" value={editGuardianPhone} onChange={(e) => setEditGuardianPhone(e.target.value)} />
                                            <input type="email" className="form-control mb-2" value={editGuardianEmail} onChange={(e) => setEditGuardianEmail(e.target.value)} />
                                            <input type="password" className="form-control mb-2" value={editPassword} onChange={(e) => setEditPassword(e.target.value)} />
                                            <input type="date" className="form-control mb-2" value={editDob} onChange={(e) => setEditDob(e.target.value)} />    
                                            <input type="text" className="form-control mb-2" value={editAddress} onChange={(e) => setEditAddress(e.target.value)} />
                                            <input type="text" className="form-control mb-2" value={editGender} onChange={(e) => setEditGender(e.target.value)} />

                                            <div className="text-center">
                                                <button className="btn btn-sm btn-primary mr-2" onClick={handleSaveEdit}><FaSave /> Save</button>
                                                <button className="btn btn-sm btn-secondary" onClick={() => setEditStudentId('')}>Cancel</button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {/* Render student details in view mode */}
                                            <h5 className="card-title">{student.name}</h5>
                                            <p className="card-text">UID: {student.uid}</p>
                                            <p className="card-text">Class: {student.className}</p>
                                            <p className="card-text">Guardian Phone: {student.guardianPhone}</p>
                                            <p className="card-text">Guardian Email: {student.guardianEmail}</p>
                                            <p className="card-text">Password: {student.password}</p>
                                            <p className="card-text">Date of Birth: {formatDateString(student.dob)}</p>
                                            <p className="card-text">Address: {student.address}</p>
                                            <p className="card-text">Gender: {student.gender}</p>
                                            
                                            <div className="text-center">
                                                <button className="btn btn-sm btn-primary mr-2" onClick={() => handleEditToggle(student._id)}> <BsPencil /> Edit</button>
                                                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteStudent(student._id, student.name)}> <BsTrash /> Delete</button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {showAddStudentDialog && <AddStudentDialog onAddStudent={handleAddStudent} onClose={handleToggleAddStudentDialog} />}
                {showDeleteDialog && <DeleteStudentDialog studentName={deleteStudentName} studentId={deleteStudentId} handleDelete={handleDeleteConfirm} />}
            </div>
        </div>
    );
};

export default StudentPage;
