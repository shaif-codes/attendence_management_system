import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import './FactsSection.css';

const FactsSection = () => {
    // State variables to store student and teacher count
    const [studentCount, setStudentCount] = useState(0);
    const [teacherCount, setTeacherCount] = useState(0);

    // Function to fetch student and teacher count from the server
    const fetchData = async () => {
        try {
            // Fetch student count
            // console.log("Ha bhai me fetchData me agya")
            const studentResponse = await axios.get('/studentCount'); // Corrected URL
            setStudentCount(studentResponse?.data?.count);

            // Fetch teacher count
            const teacherResponse = await axios.get('/teacherCount'); // Corrected URL
            setTeacherCount(teacherResponse?.data?.count);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    // Fetch data when the component mounts
    useEffect(() => {
        fetchData();
    }, [studentCount, teacherCount]);

    return (
        <section id="info" className="info" style={{width: "75vw", marginLeft: "270px"}}>
            <div className="container">
                <div className="row">
                    {/* Student Count Box */}
                    <div className="col-md-6 col-lg-3">
                        <div className="info-box text-center">
                            <i className="icons bx bx bx-child"></i>
                            <div className="data">
                                <h3>{studentCount}</h3>
                                <h5>Number of Students</h5>
                            </div>
                        </div>
                    </div>

                    {/* Teacher Count Box */}
                    <div className="col-md-6 col-lg-3">
                        <div className="info-box text-center">
                            <i className="icons bx bxs-chalkboard"></i>
                            <div className="data">
                                <h3>{teacherCount}</h3>
                                <h5>Number of Teachers</h5>
                            </div>
                        </div>
                    </div>

                    {/* Present Student Count Box */}
                    <div className="col-md-6 col-lg-3">
                        <div className="info-box text-center">
                            <i className="icons bx bxs-user-check"></i>
                            <div className="data">
                                <h3>3200</h3>
                                <h5>Students Present</h5>
                            </div>
                        </div>
                    </div>

                    {/* Present Teacher Count Box */}
                    <div className="col-md-6 col-lg-3">
                        <div className="info-box text-center">
                            <i className="icons bx bxs-user-check"></i>
                            <div className="data">
                                <h3>3200</h3>
                                <h5>Teachers Present</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FactsSection;
