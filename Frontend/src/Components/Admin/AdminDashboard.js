import React from "react";
import Header from "../Common/Header";
import FactsSection from "./FactsSection";
import './AdminDashboard.css'; // Import CSS file for custom styling
import GraphsSection from "./GraphSection";

const AdminDashboard = () => {
    const adminLinks = [
        { to: "/admin", icon: "bx bxs-dashboard", text: "Dashboard", current: true },
        { to: "/adminClass", icon: "bx bx-book-reader", text: "Classes" },
        { to: "/adminStudent", icon: "bx bx-user", text: "Students" },
        { to: "/adminTeacher", icon: "bx bx-chalkboard", text: "Teachers" }
        // Add more links as needed
    ];
    return (
        <div className="admin-dashboard-container">
            <Header links={adminLinks} userDetails={{ name: "Admin" }} />
            <div className="content">
                <FactsSection />
                <GraphsSection/>
            </div>
            

        </div>
    );
}

export default AdminDashboard;
