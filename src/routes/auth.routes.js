const express = require('express');

const {
    registerUser,
    loginUser
} = require('../controllers/auth.controller');

const { protect } = require('../middleware/auth.middleware');

const { registerValidator, loginValidator } = require('../validators/auth.validator');

const validate = require('../validators/validationResult.validator');

const router = express.Router();
// console.log('1. registerValidator is:', typeof registerValidator);
// console.log('2. validate is:', typeof validate);
// console.log('3. registerUser is:', typeof registerUser);

router.post('/register', registerValidator, validate, registerUser);

router.post('/login', loginValidator, validate, loginUser);

// router.get('/me', protect, (req, res) => {

//     res.status(200).json({
//         success: true,
//         user: req.user
//     });

// });

module.exports = router;