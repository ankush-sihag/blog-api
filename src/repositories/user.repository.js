const User = require('../models/User.model');

const createUser = async (data) => {
    return User.create(data);
};

const findUserByEmail = async (email) => {
    return User.findOne({ email });
};

module.exports = {
    createUser,
    findUserByEmail
};