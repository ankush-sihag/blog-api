const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

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

    return user;
};

const login = async (email, password) => {

    const user = await findUserByEmail(email);

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

module.exports = {
    register,
    login
};