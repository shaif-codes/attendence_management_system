import React, { useState, useEffect } from 'react';
import Header from '../Common/Header';
import { BsPencil, BsTrash } from 'react-icons/bs';
import './ClassesPage.css';
import AddClassDialog from './AddClassDialog';
import { BsPlus } from 'react-icons/bs';
import { FaSave } from "react-icons/fa";
import DeleteClassDialog from './DeleteClassDialog';

const getAllClasses = async () => {
    try {
        const response = await fetch('/class/all');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

const ClassesPage = () => {
    const [classes, setClasses] = useState([]);
    const [showAddClassDialog, setShowAddClassDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deleteClassName, setDeleteClassName] = useState('');
    const [deleteClassId, setDeleteClassId] = useState('');
    const [editingClassId, setEditingClassId] = useState(null);
    const [updatedClassName, setUpdatedClassName] = useState('');
    const [updatedTeacherName, setUpdatedTeacherName] = useState('');
    // const [updatedClassType, setUpdatedClassType] = useState('');
    const [updatedStartDate, setUpdatedStartDate] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllClasses();
            setClasses(data);
        };

        fetchData();
    }, [updatedClassName, classes]);

    const formatDateString = (isoDateString) => {
        const date = new Date(isoDateString);
        const day = date.getDate().toString().padStart(2, '0'); // Get day and pad with leading zero if needed
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get month (+1 because month is zero-indexed) and pad with leading zero if needed
        const year = date.getFullYear(); // Get full year

        return `${day}-${month}-${year}`;
    };
    const adminLinks = [
        { to: "/admin", icon: "bx bxs-dashboard", text: "Dashboard" },
        { to: "/amdinClass", icon: "bx bx-book-reader", text: "Classes", current: true },
        { to: "/adminStudent", icon: "bx bx-user", text: "Students" },
        { to: "/adminTeacher", icon: "bx bx-chalkboard", text: "Teachers" }
    ];
    

    const handleToggleDialog = () => {
        setShowAddClassDialog(!showAddClassDialog);
    };

    const handleToggleAddClassDialog = () => {
        setShowAddClassDialog(false);
    };

    const handleAddClass = (newClass) => {
        setClasses([...classes, newClass]);
    };

    const handleDeleteClass = (id, name) => {
        setDeleteClassId(id);
        setDeleteClassName(name);
        setShowDeleteDialog(true);
    };

    const handleDeleteConfirm = async (confirm) => {
        if (confirm) {
            await fetch('/class/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ _id: deleteClassId })
            }).then(response => response.json())
                .then(data => {
                    console.log(data);
                })
                .catch(error => {
                    console.error(error);
                });

            setClasses(classes.filter((classItem) => classItem.id !== deleteClassId));
        }
        setShowDeleteDialog(false);
    };

    const isAnyFieldEmpty = () => {
        return !updatedClassName || !updatedTeacherName || !updatedStartDate;
    };

    const handleEditClass = (id) => {
        console.log(id);
        setEditingClassId(id);
        // Initialize updated values with current class details
        const classToEdit = classes.find((classItem) => classItem._id === id);
        setUpdatedClassName(classToEdit.className);
        setUpdatedTeacherName(classToEdit.classTeacher);
        // setUpdatedClassType(classToEdit.type);
        setUpdatedStartDate(classToEdit.startDate);
    };

    const handleUpdateClass =  async (e) => {
        e.preventDefault()
        // Find the index of the class to be updated
        const classIndex = classes.findIndex((classItem) => classItem.id === editingClassId);
        // Create a copy of the classes array to avoid mutating state directly
        const updatedClasses = [...classes];
        // Update the class details
        updatedClasses[classIndex] = {
            ...updatedClasses[classIndex],
            name: updatedClassName,
            teacher: updatedTeacherName,
            // type: updatedClassType,
            startDate: updatedStartDate
        };
        // Update the state with the new classes array
        await fetch('/class/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedClasses[classIndex])
        }).then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });

        
        setClasses(updatedClasses);
        // Reset editing state
        setEditingClassId(null);
    };

    const handleCancelEdit = () => {
        // Reset editing state
        setEditingClassId(null);
    };

    return (
        <div className="classes-page">
            <Header links={adminLinks} activeLink="Classes" userDetails={{ name: "Admin" }} />
            <div className="container classes-page-container">
                <h2>Classes</h2>
                <div style={{ position: "absolute", top: "17px", right: "80px" }}>
                    <button className="btn btn-primary add-class-btn" onClick={handleToggleDialog}>
                        <BsPlus /> Add Class
                    </button>
                </div>
                <div className="row">
                    {classes.map((classItem) => (
                        <div key={classItem._id} className="col-lg-4 col-md-6 mb-4">
                            <div className="card class-card">
                                <div className="card-body">
                                    {/* Check if the class is in edit mode */}
                                    {editingClassId === classItem._id ? (
                                        // Render input fields for editing
                                        <div>
                                            <input type="text" className="form-control mb-2" value={updatedClassName} onChange={(e) => setUpdatedClassName(e.target.value)} placeholder='Class Name'/>
                                            <input type="text" className="form-control mb-2" value={updatedTeacherName} onChange={(e) => setUpdatedTeacherName(e.target.value)} placeholder='Class Teacher Name' />
                                            {/* <input type="text" className="form-control mb-2" value={updatedClassType} onChange={(e) => setUpdatedClassType(e.target.value)} /> */}
                                            <input type="date" className="form-control mb-2" value={updatedStartDate} onChange={(e) => setUpdatedStartDate(e.target.value)} placeholder='start date' />
                                            {/* Disable the "Update" button if any field is empty */}
                                            <div className="text-center">
                                                <button className="btn btn-sm btn-primary mr-2" onClick={handleUpdateClass} disabled={isAnyFieldEmpty()}><FaSave/> Update</button>
                                                <button className="btn btn-sm btn-secondary" onClick={handleCancelEdit}>Cancel</button>
                                            </div>
                                        </div>
                                    ) : (
                                        // Render class details in view mode
                                        <div>
                                                <h5 className="card-title">{classItem.className}</h5>
                                                <p className="card-text">Teacher: {classItem.classTeacher}</p>
                                            {/* <p className="card-text">Type: {classItem.type}</p> */}
                                                <p className="card-text">Start Date: {formatDateString(classItem.startDate)}</p>
                                            {/* Button to switch to edit mode */}
                                            <div className="text-center">
                                                <div className="text-center">
                                                        <button className="btn btn-sm btn-primary mr-2" onClick={() => handleEditClass(classItem._id)}>
                                                        <BsPencil /> Edit
                                                    </button>
                                                    <button className="btn btn-sm btn-danger" onClick={() => handleDeleteClass(classItem._id, classItem.name)}>
                                                        <BsTrash /> Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {showAddClassDialog && <AddClassDialog onAddClass={handleAddClass} setToggleDialog={handleToggleAddClassDialog} />}
                {showDeleteDialog && <DeleteClassDialog className={deleteClassName} classId={deleteClassId} handleDelete={handleDeleteConfirm} />}
            </div>
        </div>
    );
};

export default ClassesPage;
