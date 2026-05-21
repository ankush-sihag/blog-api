const { body } = require('express-validator');

const registerValidator = [
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 3 })
        .withMessage('Name must be atleast 3 characters'),

    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email format'),

    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be atleast 6 characters'),

];

const loginValidator = [
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email'),

    body('password')
        .notEmpty()
        .withMessage('password is required'),

];

const forgotPasswordValidator = [

    body('email')
        .isEmail()
        .withMessage(
            'Valid email required'
        )
];

const resetPasswordValidator = [

    body('password')
        .isLength({ min: 6 })
        .withMessage(
            'Password must be at least 6 characters'
        )
];

module.exports = { registerValidator, loginValidator, forgotPasswordValidator, resetPasswordValidator };
