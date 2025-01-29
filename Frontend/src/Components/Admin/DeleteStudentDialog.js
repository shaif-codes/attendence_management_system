// DeleteStudentDialog.js
import React from 'react';
import './DeleteStudentDialog.css';

const DeleteStudentDialog = ({ studentName, studentId, handleDelete}) => {
    return (
        <div className="delete-student-dialog">
            <div className="delete-student-dialog-content">
                <h3>Delete Student</h3>
                <p>Are you sure you want to delete the student "{studentId}:{studentName}"?</p>
                <div className="btn-group">
                    <button className="btn btn-danger" onClick={()=>handleDelete(true)}>Confirm</button>
                    <button className="btn btn-secondary" onClick={()=>handleDelete(false)}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteStudentDialog;
