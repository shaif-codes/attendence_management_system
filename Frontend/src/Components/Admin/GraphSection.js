// GraphsSection.js
import React from 'react';
import StudentPresentGraph from './StudentPresentGraph';
import TeacherPresentGraph from './TeacherPresentGraph';
// import './GraphsSection.css'; // Import CSS file for styling 

const GraphsSection = () => {
    return (
        <div className="container" style={{ width: "75vw", marginLeft: "270px" }}>
            <div className="row">
                <div className="col-md-6">
                    <div className="graph">
                        <StudentPresentGraph />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="graph">
                        <TeacherPresentGraph />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GraphsSection;
