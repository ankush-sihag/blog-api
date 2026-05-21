const express = require('express');

const {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword
} = require('../controllers/auth.controller');

const { protect } = require('../middleware/auth.middleware');

const { registerValidator, loginValidator, forgotPasswordValidator, resetPasswordValidator } = require('../validators/auth.validator');

const validate = require('../validators/validationResult.validator');

const router = express.Router();
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */

router.post('/register', registerValidator, validate, registerUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */

router.post('/login', loginValidator, validate, loginUser);

router.post(
    '/forgot-password',
    forgotPasswordValidator,
    validate,
    forgotPassword
);

router.put(
    '/reset-password/:token',
    resetPasswordValidator,
    validate,
    resetPassword
);


module.exports = router;