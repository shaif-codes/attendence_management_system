import React from 'react';
import './DeleteClassDialog.css'

const DeleteClassDialog = ({ className, classId, handleDelete }) => {
    return (
        <div className="delete-class-dialog">
            <div className="delete-class-dialog-content">
                <h3>Delete Class</h3>
                <p>Are you sure you want to delete the class "{classId}: {className}"?</p>
                <div className="btn-group">
                    <button className="btn btn-danger" onClick={() => handleDelete(true)}>Confirm</button>
                    <button className="btn btn-secondary" onClick={() => handleDelete(false)}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteClassDialog;
