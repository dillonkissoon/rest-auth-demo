const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const decodeToken = (token) => {
    return jwt.decode(token);
}

const signToken = (data, secret, options = {}) => {
    return jwt.sign(data, secret, options);
}

const verifyToken = (token, secret, callback) =>  {
    return jwt.verify(token, secret, callback);
}

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}

const validatePassword = async (password, passwordInDb) => {
    return await bcrypt.compare(password, passwordInDb);
}

module.exports = {
    decodeToken,
    hashPassword,
    signToken,
    validatePassword,
    verifyToken
};