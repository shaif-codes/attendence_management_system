import React, { useState } from 'react';
import './AddClassDialog.css';

const AddClassDialog = ({ onAddClass, setToggleDialog }) => {
    const [showDialog, setShowDialog] = useState(false);
    const [className, setClassName] = useState('');
    const [teacherName, setTeacherName] = useState('');
    // const [classType, setClassType] = useState('');
    const [startDate, setStartDate] = useState('');

    const handleToggleDialog = () => {
        setShowDialog(!showDialog);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const newClass = {
            className: className,
            classTeacher: teacherName,
            startDate: startDate
        };

        fetch('/class/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newClass)
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the server
            console.log(data);
            onAddClass(newClass);
        })
        .catch(error => {
            // Handle any errors
            console.error(error);
        });
       
        setToggleDialog(false)
    };
    
    

    return (
        <>
            <div className={`add-class-dialog ${showDialog ? 'show' : ''}`}>
                <div className="add-class-dialog-content" onClick={handleToggleDialog}>
                    <div className="add-class-dialog-card" onClick={(e) => e.stopPropagation()}>
                        <div className="card-header">
                            <h3>Add New Class</h3>
                            <button className="btn-close" onClick={setToggleDialog}>×</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="className">Class Name</label>
                                <input type="text" className="form-control" id="className" value={className} onChange={(e) => setClassName(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="teacherName">Teacher Name</label>
                                <input type="text" className="form-control" id="teacherName" value={teacherName} onChange={(e) => setTeacherName(e.target.value)} required />
                            </div>
                            {/* <div className="form-group">
                                <label htmlFor="classType">Class Type</label>
                                <input type="text" className="form-control" id="classType" value={classType} onChange={(e) => setClassType(e.target.value)} required />
                            </div> */}
                            <div className="form-group">
                                <label htmlFor="startDate">Class Start Date</label>
                                <input type="date" className="form-control" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>

            </div>
        </>
    );
};

export default AddClassDialog;
