const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('./src/config/database');

const app = require('./src/app');

const logger = require('./src/config/logger');

process.on(
    'uncaughtException', (error) => {
        logger.error(
            `UNCAUGHT EXCEPTION: ${ error.message }`
        );
        process.exit(1);
    }
);

const PORT = process.env.PORT || 5000;
connectDB();

const server = app.listen(PORT, () => {
    logger.info(`Server Running  on port ${PORT}`);
});

process.on(
    'unhandledRejection', (error) => {
        logger.error(
            `UNHANDLED REJECTION: ${ error.message }`
        );
        server.close(() => {
            process.exit(1);
        });
    }
);

process.on('SIGTERM', () => {
    logger.info('SIGTERM recevied. shutting down gracefully');

    server.close(() => {
        logger.info('Process terminated.');
    });
});