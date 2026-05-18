const errorMiddleware = (err, req, res, next) => {
    const statusCode = err. statusCode || 500;
    const message = err.message || 'internal server error';

    res.status(statusCode).json({
        success: false,
        message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : null
         
    });
};

module.exports = errorMiddleware;