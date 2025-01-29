// import React, { useState, useEffect } from 'react';
// import Header from '../Common/Header';
// import { BsPlus, BsPencil, BsTrash } from 'react-icons/bs';
// import { FaSave } from "react-icons/fa";
// import AddTeacherDialog from './AddTeacherDialog';
// import './TeacherPage.css';
// import DeleteTeacherDialog from './DeleteTeacherDialog';

// const getTeachers = async () => {
//     try {
//         const response = await fetch('http://localhost:5000/teacher/all');
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.log(error.message);
//     }
// };


// const TeacherPage = () => {
//     const [showAddTeacherDialog, setShowAddTeacherDialog] = useState(false);
//     const [showDeleteDialog, setShowDeleteDialog] = useState(false);
//     const [deleteTeacherId, setDeleteTeacherId] = useState(null);
//     const [deleteTeacherName, setDeleteTeacherName] = useState('');
//     const [teachers, setTeachers] = useState([]);

//     useEffect(() => { 
//         getTeachers().then(data => setTeachers(data));
//     }, [teachers]);

//     const teacherLinks = [
//         { to: "/admin", icon: "bx bxs-dashboard", text: "Dashboard" },
//         { to: "/adminClass", icon: "bx bx-book-reader", text: "Classes" },
//         { to: "/adminStudent", icon: "bx bx-user", text: "Students" },
//         { to: "/adminTeacher", icon: "bx bx-chalkboard", text: "Teachers", current: true }
//     ];

//     const handleToggleAddTeacherDialog = () => {
//         setShowAddTeacherDialog(!showAddTeacherDialog);
//     };

//     const handleAddTeacher = (teacher) => {
//         setTeachers([...teachers, teacher]);
//     };

//     const handleEditTeacher = (id) => {
//         const updatedTeachers = teachers.map(teacher =>
//             teacher.id === id ? { ...teacher, isEditing: !teacher.isEditing } : teacher
//         );
//         setTeachers(updatedTeachers);
//     };

//     const handleDeleteTeacher = (id, name) => {
//         setDeleteTeacherId(id);
//         setDeleteTeacherName(name);
//         setShowDeleteDialog(true);
//     };

//     const handleDeleteTeacherConfirm = (confirm) => {
//         if (confirm) {
//             const updatedTeachers = teachers.filter(teacher => teacher.id !== deleteTeacherId);
//             setTeachers(updatedTeachers);
//         }
//         setShowDeleteDialog(false);
//     };

//     const handleInputChange = (e, id) => {
//         const { name, value } = e.target;
//         const updatedTeachers = teachers.map(teacher =>
//             teacher.id === id ? { ...teacher, [name]: value } : teacher
//         );
//         setTeachers(updatedTeachers);
//     };

//     const handleSaveTeacher = (id) => {
//         const updatedTeachers = teachers.map(teacher =>
//             teacher.id === id ? { ...teacher, isEditing: false } : teacher
//         );
//         setTeachers(updatedTeachers);
//     };

//     return (
//         <div className="teacher-page">
//             <Header links={teacherLinks} userDetails={{ name: "Admin" }} />
//             <div className="container teacher-page-container">
//                 <h2>Teachers</h2>
//                 <div className="text-center" style={{ position: "absolute", top: "17px", right: "80px" }}>
//                     <button className="btn btn-primary" onClick={handleToggleAddTeacherDialog}>
//                         <BsPlus /> Add Teacher
//                     </button>
//                 </div>
//                 <div className="row">
//                     {teachers.map(teacher => (
//                         <div key={teacher.id} className="col-lg-4 col-md-6 mb-4">
//                             <div className="card teacher-card">
//                                 <div className="card-body">
//                                     {teacher.isEditing ? (
//                                         <div>
//                                             <input type="text" className="form-control mb-2" name="name" value={teacher.name} onChange={(e) => handleInputChange(e, teacher.id)} />
//                                             <input type="text" className="form-control mb-2" name="subject" value={teacher.subject} onChange={(e) => handleInputChange(e, teacher.id)} />
//                                             <input type="text" className="form-control mb-2" name="experience" value={teacher.experience} onChange={(e) => handleInputChange(e, teacher.id)} />
//                                             <div className="text-center">
//                                                 <button className="btn btn-sm btn-primary mr-2" onClick={() => handleSaveTeacher(teacher.id)}>
//                                                     <FaSave/> Save
//                                                 </button>
//                                                 <button className="btn btn-sm btn-secondary" onClick={() => handleEditTeacher(teacher.id)}>
//                                                     Cancel
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     ) : (
//                                         <div>
//                                             <h5 className="card-title">{teacher.name}</h5>
//                                             <p className="card-text">Assined Class: {teacher.classTeacherOf}</p>
//                                             <p className="card-text">Email: {teacher.email}</p>
//                                             <p className="card-text">Phone: {teacher.phone}</p>
//                                             <p className="card-text">Password: {teacher.password}</p>
//                                             <p className="card-text">Email: {teacher.email}</p>
//                                             <div className="text-center">
//                                                 <button className="btn btn-sm btn-primary mr-2" onClick={() => handleEditTeacher(teacher.id)}>
//                                                     <BsPencil /> Edit
//                                                 </button>
//                                                 <button className="btn btn-sm btn-danger" onClick={() => handleDeleteTeacher(teacher.id, teacher.name)}>
//                                                     <BsTrash /> Delete
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//                 {showDeleteDialog && <DeleteTeacherDialog teacherName={deleteTeacherName} teacherId={deleteTeacherId} handleDelete={handleDeleteTeacherConfirm} />}
//                 {showAddTeacherDialog && <AddTeacherDialog onAddTeacher={handleAddTeacher} onClose={handleToggleAddTeacherDialog} />}
//             </div>
//         </div>
//     );
// };

// export default TeacherPage;

import React, { useState, useEffect } from 'react';
import Header from '../Common/Header';
import { BsPlus, BsPencil, BsTrash } from 'react-icons/bs';
import { FaSave } from "react-icons/fa";
import AddTeacherDialog from './AddTeacherDialog';
import './TeacherPage.css';
import DeleteTeacherDialog from './DeleteTeacherDialog';


const getTeachers = async () => {
    try {
        const response = await fetch('teacher/all');
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

const TeacherPage = () => {
    const [showAddTeacherDialog, setShowAddTeacherDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deleteTeacherId, setDeleteTeacherId] = useState(null);
    const [deleteTeacherName, setDeleteTeacherName] = useState('');
    const [teachers, setTeachers] = useState([]);
    const [editingTeacherId, setEditingTeacherId] = useState(null);
    const [editingUid, setEditingUid] = useState(null);
    const [editingName, setEditingName] = useState('');
    const [editingClass, setEditingClass] = useState('');
    const [editingEmail, setEditingEmail] = useState('');
    const [editingPhone, setEditingPhone] = useState('');
    const [editingPassword, setEditingPassword] = useState('');

    useEffect(() => {
        getTeachers().then(data => setTeachers(data));
    }, [teachers]);

    const teacherLinks = [
        { to: "/admin", icon: "bx bxs-dashboard", text: "Dashboard" },
        { to: "/adminClass", icon: "bx bx-book-reader", text: "Classes" },
        { to: "/adminStudent", icon: "bx bx-user", text: "Students" },
        { to: "/adminTeacher", icon: "bx bx-chalkboard", text: "Teachers", current: true }
    ];

    const handleToggleAddTeacherDialog = () => {
        setShowAddTeacherDialog(!showAddTeacherDialog);
    };

    const handleAddTeacher = (teacher) => {
        setTeachers([...teachers, teacher]);
    };
    const handleEditToggle = (id) => {
        setEditingTeacherId(id);
        const teacherToEdit = teachers.find(teacher => teacher._id === id)
        
        if(teacherToEdit){
            setEditingUid(teacherToEdit.uid);
            setEditingName(teacherToEdit.name);
            setEditingClass(teacherToEdit.classTeacherOf)
            setEditingEmail(teacherToEdit.email);
            setEditingPhone(teacherToEdit.phone)
            setEditingPassword(teacherToEdit.classTeacherOf)

        }
    }

    const handleSaveEdit = async ()=>{
        const teacherIndex = teachers.findIndex(teacherItem => teacherItem._id = editingTeacherId)
        const updatedTeachers = [...teachers]
        updatedTeachers[teacherIndex] = {
            ...updatedTeachers[teacherIndex],
            _id: editingTeacherId,
            name: editingName,
            uid: editingUid,
            classTeacherOf: editingClass,
            email: editingEmail,
            phone: editingPhone,
            password: editingPassword
        }
        console.log(updatedTeachers[teacherIndex])
        console.log(updatedTeachers)
        await fetch('/teacher/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTeachers[teacherIndex])
        }).then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));  
        console.log("we are done here")
        setTeachers(updatedTeachers)
        setEditingTeacherId('')
    }

    const handleCancelEdit = () => {
        setEditingTeacherId(null);
    };

    const handleDeleteTeacher = (id, name) => {
        setDeleteTeacherId(id);
        setDeleteTeacherName(name);
        setShowDeleteDialog(true);
    };

    const handleDeleteTeacherConfirm = (confirm) => {
        if (confirm) {
            const updatedTeachers = teachers.filter(teacher => teacher._id !== deleteTeacherId);
            console.log(deleteTeacherId)
            fetch('/teacher/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ _id: deleteTeacherId })
            }).then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.log(error));


            setTeachers(updatedTeachers);
        }
        setShowDeleteDialog(false);
    };

    return (
        <div className="teacher-page">
            <Header links={teacherLinks} userDetails={{ name: "Admin" }} />
            <div className="container teacher-page-container">
                <h2>Teachers</h2>
                <div className="text-center" style={{ position: "absolute", top: "17px", right: "80px" }}>
                    <button className="btn btn-primary" onClick={handleToggleAddTeacherDialog}>
                        <BsPlus /> Add Teacher
                    </button>
                </div>
                <div className="row">
                    {teachers.map(teacher => (
                        <div key={teacher._id} className="col-lg-4 col-md-6 mb-4">
                            <div className="card teacher-card">
                                <div className="card-body">
                                    {editingTeacherId === teacher._id ? (
                                        <div>
                                            <input type="text" className="form-control mb-2" name="name" value={editingName} onChange={(e) => setEditingName(e.target.value)} />
                                            <input type="text" className="form-control mb-2" name="name" value={editingUid} onChange={(e) => setEditingName(e.target.value)} />
                                            <input type="text" className="form-control mb-2" name="classTeacherOf" value={editingClass} onChange={(e) => setEditingClass(e.target.value)} />
                                            <input type="text" className="form-control mb-2" name="email" value={editingEmail} onChange={(e) => setEditingEmail(e.target.value)} />
                                            <input type="text" className="form-control mb-2" name="phone" value={editingPhone} onChange={(e) => setEditingPhone(e.target.value)} />
                                            <input type="text" className="form-control mb-2" name="password" value={editingPassword} onChange={(e) => setEditingPassword(e.target.value)} />
                                            
                                            <div className="text-center">
                                                <button className="btn btn-sm btn-primary mr-2" onClick={() => handleSaveEdit()}>
                                                    <FaSave /> Save
                                                </button>
                                                <button className="btn btn-sm btn-secondary" onClick={handleCancelEdit}>
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <h5 className="card-title">{teacher.name}</h5>
                                            <p className="card-text">Assined Class: {teacher.classTeacherOf}</p>
                                            <p className="card-text">Uid: {teacher.uid}</p>
                                            <p className="card-text">Phone: {teacher.phone}</p>
                                            <p className="card-text">Password: {teacher.password}</p>
                                            <p className="card-text">Email: {teacher.email}</p>
                                            <div className="text-center">
                                                <button className="btn btn-sm btn-primary mr-2" onClick={() => handleEditToggle(teacher._id)}>
                                                    <BsPencil /> Edit
                                                </button>
                                                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteTeacher(teacher._id, teacher.name)}>
                                                    <BsTrash /> Delete
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {showDeleteDialog && <DeleteTeacherDialog teacherName={deleteTeacherName} teacherId={deleteTeacherId} handleDelete={handleDeleteTeacherConfirm} />}
                {showAddTeacherDialog && <AddTeacherDialog onAddTeacher={handleAddTeacher} onClose={handleToggleAddTeacherDialog} />}
            </div>
        </div>
    );
};

export default TeacherPage;

