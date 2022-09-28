const jwt = require("jsonwebtoken")
const keys = require('../config/keys');
const { secret, tokenLife } = keys.jwt;
exports.replaceQuotes = function (text) {
    //replace single quotes and double quotes
    let singleQuoteRegex = /'/g;
    let doubleQuoteRegex = /"/g;
    return text.toString().replace(doubleQuoteRegex, '\"').replace(singleQuoteRegex, "''")
};
exports.generateJWT = async function (user, secret, timeout) {
    var token = jwt.sign({
        data: {
            id: user.id,
            name: user.firstName,
            email: user.email
        }
    }, secret, {
        expiresIn: 60
    });
    return String(token);
};

exports.generateJWTV1 = async function (payload, secret, timeout) {
    var token = jwt.sign(payload, secret, {
        expiresIn: 60
    });
    return String(token);
}
