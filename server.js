const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./src/config/database');

dotenv.config();
connectDB();

const app = express();

app.use(helmet());

app.use(cors());

app.use(express.json({ limit: '10kb' }));

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'active', timestamp: new Date() });
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        error: {
            message: err.message || 'Internal Server Error',
            status: statusCode,
            stack: process.env.NODE_ENV === 'development' ? err.stack: undefined
        }
    });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`[Server Ready] Running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
    console.error(`[Unhandled Rejection] Error: ${err.message}`);
    server.close(() => process.exit(1));
});