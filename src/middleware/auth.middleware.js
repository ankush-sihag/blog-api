const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const asyncHandler = require('./async.middleware');

const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        const error = new Error('Not authorized');
        error.statusCode = 401;
        throw error;
    }

    const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
    );
    console.log(decoded);

    const user = await User.findById(decoded.id).select('-password');

    console.log(user);

    if (!user) {
        const error = new Error('User not found');
        error.statusCode = 401;
        throw error;
    }

    req.user = user;
    next();
});

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            const error = new Error(
                'Access Denied'
            );
            error.statusCode = 403;
            return next(error);
            
        }
        next();
    };
};

module.exports = { protect, authorize };