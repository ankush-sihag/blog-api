const mongoose = require('mongoose');
const { isStrongPassword } = require('validator');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        resetPasswordToken: {
            type: String
        },
        resetPasswordExpire: {
            type: Date
        },
        verificationToken: {
            type: String
        },
        role: {
            type: String,
            enum: ['user', 'admin' ],
            default: 'user'
        },
        isVerified: {
            type: Boolean,
            default: false
        },
            
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;