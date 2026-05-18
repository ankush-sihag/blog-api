const asyncHandler = require('../middleware/async.middleware');

const {
    register,
    login
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

module.exports = {
    registerUser,
    loginUser
};