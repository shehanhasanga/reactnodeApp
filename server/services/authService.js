const userModel = require('../models/user');
const camelCaseKeys = require('camelcase-keys');
const empty = require('is-empty');
const bcrypt = require('bcryptjs');
const BaseError = require('../locales/errors')


class UserService{
    constructor() {

    }

    async loginUser(email, password) {
        var user = await userModel.getUserByEmail(email)
        user = camelCaseKeys(user)
        if (!empty(user)) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                let errorType =  BaseError.errorTypes.PASSWORD_INCORRECT;
                throw new BaseError(errorType)
            }
            const token = await basicUtil.generateJWT(users, secret, { expiresIn: tokenLife });
            if (!token) {
                throw new Error();
            }
            return {
                success: true,
                token,
                user
            }
        } else {
            let errorType =  BaseError.errorTypes.USER_NOT_FOUND;
            throw new BaseError(errorType)
        }

    }
}

module.exports = UserService;
