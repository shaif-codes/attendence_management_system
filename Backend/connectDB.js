// db.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Function to establish database connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connection established");
    } catch (error) {
        console.error("An Error occurred:\n", error);  
    }
};

// Export the connectDB function
module.exports = connectDB;
