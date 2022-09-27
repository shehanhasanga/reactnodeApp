
const keys = require('../config/keys');
const { secret, tokenLife } = keys.jwt;
exports.replaceQuotes = function (text) {
    //replace single quotes and double quotes
    let singleQuoteRegex = /'/g;
    let doubleQuoteRegex = /"/g;
    return text.toString().replace(doubleQuoteRegex, '\"').replace(singleQuoteRegex, "''")
};
exports.generateJWT = async function (user) {
    var token = jwt.sign({
        data: {
            id: users.id,
            name: users.userName,
            email: users.email
        }
    }, config.get('PrivateKey'), {
        expiresIn: 60
    });
    return String(token);
};
