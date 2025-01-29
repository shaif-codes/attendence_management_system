import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const generateRandomData = () => {
    const data = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const studentsPresent = Math.floor(Math.random() * 100); // Generating random number of students present
        data.push({ name: date.toLocaleDateString(), value: studentsPresent });
    }
    return data;
};

const StudentPresentGraph = () => {
    const data = generateRandomData();

    return (
        <div className="container">
            <div className="card shadow p-3 mb-5 bg-white rounded">
                <div className="card-body">
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="value" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default StudentPresentGraph;
