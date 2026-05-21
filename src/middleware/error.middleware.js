const envConfig = require('../config/env');

const errorMiddleware = (
    err,
    req,
    res,
    next
) => {

    const statusCode =
        err.statusCode || 500;

    const message =
        err.message ||
        'Internal Server Error';

    const response = {

        success: false,

        message
    };

    if (
        envConfig.nodeEnv ===
        'development'
    ) {

        response.stack = err.stack;

        response.error = err;
    }

    res.status(statusCode).json(
        response
    );
};

module.exports = errorMiddleware;