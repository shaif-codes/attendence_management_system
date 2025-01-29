// AddTeacherDialog.js
import React, { useState } from 'react';
import './AddTeacherDialog.css';

const AddTeacherDialog = ({ onAddTeacher, onClose }) => {
    const [uid, setUid] = useState('');
    const [name, setName] = useState('');
    const [classTeacherOf, setClassTeacherOf] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTeacher = {
            uid: uid,
            name: name,
            classTeacherOf: classTeacherOf,
            email: email,
            phone: phone,
            password: password
        };
        await fetch('/teacher/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTeacher)

        }).then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));

        
        onAddTeacher(newTeacher);
        onClose();
    };

    return (
        <div className="add-teacher-dialog">
            <div className="add-teacher-dialog-content">
                <div className="add-teacher-dialog-card">
                    <div className="card-header">
                        <h3>Add New Teacher</h3>
                        <button className="btn-close" onClick={onClose}>×</button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>UID</label>
                            <input type="text" className="form-control" value={uid} onChange={(e) => setUid(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Class Teacher Of</label>
                            <input type="text" className="form-control" value={classTeacherOf} onChange={(e) => setClassTeacherOf(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input type="tel" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Add Teacher</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddTeacherDialog;
