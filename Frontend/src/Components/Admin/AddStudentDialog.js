// AddStudentDialog.js
import React, { useState } from 'react';
import './AddStudentDialog.css';

const AddStudentDialog = ({ onAddStudent, onClose }) => {
    // const [uid, setUid] = useState('');
    const [name, setName] = useState('');
    const [className, setClassName] = useState('');
    const [guardianPhone, setGuardianPhone] = useState('');
    // const [guardianEmail, setGuardianEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [dob, setDob] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newStudent = {
            uid: (guardianPhone+name),
            name: name,
            className: className,
            guardianPhone: Number(guardianPhone),
            guardianEmail: "",
            password: (guardianPhone + name),
            dob: dob,
            address: address,
            gender: gender
        };
        // const newStudent = {
        //     uid: "S987654321",
        //     name: "Jane Smith",
        //     className: "9B",
        //     guardian_phone: 9876543210,
        //     guardian_email: "guardian2@example.com",
        //     password: "securepassword",
        //     dob: "2006-08-15",
        //     address: "456 Elm Street, Town, Country",
        //     gender: "Female"
        // }

        await fetch('/astudent/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newStudent)
        }).then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));


        onAddStudent(newStudent);
        onClose();
    };

    return (
        <div className="add-student-dialog">
            <div className="add-student-dialog-content">
                <div className="add-student-dialog-card">
                    <div className="card-header">
                        <h3>Add New Student</h3>
                        <button className="btn-close" onClick={onClose}>×</button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        {/* <div className="form-group">
                            <label>UID</label>
                            <input type="text" className="form-control" value={uid} onChange={(e) => setUid(e.target.value)} required />
                        </div> */}
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Class</label>
                            <input type="text" className="form-control" value={className} onChange={(e) => setClassName(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Guardian Phone</label>
                            <input type="tel" className="form-control" value={guardianPhone} onChange={(e) => setGuardianPhone(e.target.value)} required />
                        </div>
                        {/* <div className="form-group">
                            <label>Guardian Email</label>
                            <input type="email" className="form-control" value={guardianEmail} onChange={(e) => setGuardianEmail(e.target.value)} required />
                        </div> */}
                        {/* <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div> */}
                        <div className="form-group">
                            <label>Date of Birth</label>
                            <input type="date" className="form-control" value={dob} onChange={(e) => setDob(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Gender</label>
                            <select className="form-control" value={gender} onChange={(e) => setGender(e.target.value)} required>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Add Student</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddStudentDialog;
