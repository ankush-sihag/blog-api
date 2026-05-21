const asyncHandler = require('../middleware/async.middleware');

const {
    register,
    login,
    forgotPassword,
    resetPassword,
    verifyEmail: verifyEmailService
} = require('../services/auth.service');

const registerUser = asyncHandler(async (req, res) => {

    const user = await register(req.body);

    res.status(201).json({
        success: true,
        data: user
    });
});

const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const result = await login(email, password);

    res.status(200).json({
        success: true,
        data: result
    });
});

const forgotPasswordHandler =
    asyncHandler(
        async (req, res) => {

            await forgotPassword(
                req.body.email
            );

            res.status(200).json({
                success: true,
                message: 'Password reset email sent'
            });
        }
    );

const resetPasswordHandler =
    asyncHandler(
        async (req, res) => {

            await resetPassword(
                req.params.token,
                req.body.password
            );

            res.status(200).json({
                success: true,
                message: 'Password reset successful'
            });
        }
    );

const verifyEmailHandler =
    asyncHandler(
        async (req, res) => {

            await verifyEmailService(
                req.params.token
            );

            res.status(200).json({
                success: true,
                message: 'Email verified successfully'
            });
        }
    );

module.exports = {
    registerUser,
    loginUser,
    forgotPassword: forgotPasswordHandler,
    resetPassword: resetPasswordHandler,
    verifyEmail: verifyEmailHandler
};