const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const crypto = require(
    'crypto'
);

const sendEmail = require(
    '../utils/sendEmail'
);

const generateResetToken =
    require(
        '../utils/generateResetToken'
    );

const generateVerificationToken =
    require(
        '../utils/generateVerificationToken'
    );



const ApiError = require(
    '../utils/ApiError'
);

const User = require(
    '../models/User.model'
);

const {
    createUser,
    findUserByEmail
} = require('../repositories/user.repository');

const register = async (data) => {

    const existingUser = await findUserByEmail(data.email);

    if (existingUser) {
        const error = new Error('User already exists');

        error.statusCode = 400;

        throw error;
    }

    

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await createUser({
        ...data,
        password: hashedPassword
    });

    const verificationToken =
        generateVerificationToken();

    console.log('Verification Token:',verificationToken);

    const hashedToken =
        crypto
            .createHash('sha256')
            .update(verificationToken)
            .digest('hex');

    user.verificationToken =
        hashedToken;

    await user.save();

    const verificationUrl =
        `http://localhost:3000/verify-email/${verificationToken}`;


        await sendEmail({

            to: user.email,

            subject:
                'Verify Your Email',

            html: `
                <h2>Email Verification</h2>

                <p>Click below link to verify your account:</p>

                <a href="${verificationUrl}">
                    Verify Email
                </a>
            `
        });

    return user;
};

const login = async (email, password) => {

    const user = await findUserByEmail(email);
    console.log(user);

    if (!user) {
        const error = new Error('Invalid credentials');

        error.statusCode = 401;

        throw error;
    }

    const isMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!isMatch) {
        const error = new Error('Invalid credentials');

        error.statusCode = 401;

        throw error;
    }

    if (!user.isVerified) {

        throw new ApiError(
            401,
            'Please verify your email before login'
        );
    }

    const token = jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '7d'
        }
    );

    return {
        user,
        token
    };
};

const forgotPassword = async (
    email
) => {

    const user =
        await User.findOne({
            email
        });

    if (!user) {

        throw new ApiError(
            404,
            'User not found'
        );
    }

    const resetToken =
        generateResetToken();

    const hashedToken =
        crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

    user.resetPasswordToken =
        hashedToken;

    user.resetPasswordExpire =
        Date.now() +
        10 * 60 * 1000;

    await user.save();

    const resetUrl =
        `http://localhost:3000/reset-password/${resetToken}`;

    const html = `
        <h2>Password Reset</h2>

        <p>Click below link to reset your password:</p>

        <a href="${resetUrl}">
            Reset Password
        </a>
    `;

    await sendEmail({

        to: user.email,

        subject:
            'Password Reset Request',

        html
    });

    return;
};

const resetPassword = async (token, password) => {

    const hashedToken =
        crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');

    const user =
        await User.findOne({

            resetPasswordToken:
                hashedToken,

            resetPasswordExpire:
                {
                    $gt: Date.now()
                }
        });

    if (!user) {

        throw new ApiError(
            400,
            'Invalid or expired reset token'
        );
    }

    user.password = password;

    user.resetPasswordToken =
        undefined;

    user.resetPasswordExpire =
        undefined;

    await user.save();

    return;
};

const verifyEmail = async (token) => {

   console.log("RAW TOKEN:", token);

   const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

   console.log("HASHED TOKEN:", hashedToken);

   const user = await User.findOne({
    verificationToken: hashedToken
   });

   console.log("FOUND USER:", user);

   if (!user) {
      throw new ApiError(400, "Invalid verification token");
   }

   user.isVerified = true;

   user.verificationToken = undefined;

   await user.save();

   return user;
};

module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword,
    verifyEmail
};