const User = require('../models/User.model');

const createUser = async (data) => {
    return User.create(data);
};

const findUserByEmail = async (email) => {
    return User.findOne({ email }).select('+password +isVarified');
};

module.exports = {
    createUser,
    findUserByEmail
};