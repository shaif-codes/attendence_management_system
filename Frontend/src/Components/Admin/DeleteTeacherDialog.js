// DeleteTeacherDialog.js
import React from 'react';
import './DeleteTeacherDialog.css';

const DeleteTeacherDialog = ({ teacherName, teacherId, handleDelete }) => {
    return (
        <div className="delete-teacher-dialog">
            <div className="delete-teacher-dialog-content">
                <h3>Delete Teacher</h3>
                <p>Are you sure you want to delete the teacher "{teacherId}:{teacherName}"?</p>
                <div className="btn-group">
                    <button className="btn btn-danger" onClick={() => handleDelete(true)}>Confirm</button>
                    <button className="btn btn-secondary" onClick={() => handleDelete(false)}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteTeacherDialog;
