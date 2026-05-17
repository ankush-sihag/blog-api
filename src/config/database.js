const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`[Database Connected] Host references: ${conn.connect.host}`);
    } catch (error) {
        console.error(`[Database Connection Failure] Details: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;