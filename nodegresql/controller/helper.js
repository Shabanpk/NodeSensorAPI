const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Helper = {

    hashPassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
    },

    comparePassword(hashPassword, password) {
        return bcrypt.compareSync(password, hashPassword);
    },

    isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    },

    generateToken(userInfo) {
        return jwt.sign(
            userInfo,
             "abcdefghijkl"
            //process.env.SECRET
        );
    },

    decodeToken(token, callback) {
        return jwt.verify(
            token,
            "abcdefghijkl",
            //process.env.SECRET,
            callback
        );
    }
};

module.exports = Helper;