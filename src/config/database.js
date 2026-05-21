const envConfig = require('./env');

const mongoose = require('mongoose');

const connectDB = async () => {

    console.log("Database URI is:", envConfig.mongoUri);
    try {
        const conn = await mongoose.connect(
            envConfig.mongoUri,
            {

                maxPoolSize: 10,

                serverSelectionTimeoutMS:
                    5000
            }
        );
        console.log(`[Database Connected] Host reference: ${conn.connection.host}`);
    } catch (error) {
        console.error(`[Database Connection Failure] Details: ${error.message}`);
        
        process.exit(1);
    }
};

module.exports = connectDB;