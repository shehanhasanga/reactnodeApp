
const camelCaseKeys = require('camelcase-keys');
const empty = require('is-empty');
const bcrypt = require('bcryptjs');
const BaseError = require('../locales/errors')
const {
    db
} = require('../config/sqlize/sequelize')
const keys = require('../config/keys');
const basicUtil =  require('../utils/basicUtils')
const crypto = require('crypto');
const { secret, tokenLife } = keys.jwt;
const mailgun = require('./mail/mailgun');
class UserService{
    constructor() {

    }

    async registerUser(user){

        let existingUser = await db.user.findOne({ where: { email: user.email } })
        if (existingUser) {
            throw new BaseError(BaseError.errorTypes.USER_IS_ALREADY_EXISTS)
        }
        let subscribed = false;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        const registeredUser = await  db.user.create(
            {
                email:  user.email,
                password: hash,
                firstName : user.firstName,
                lastName : user.lastName
            });
        const payload = {
            user: registeredUser
        };
        await mailgun.sendEmail(
            registeredUser.email,
            'signup',
            null,
            registeredUser
        );
        const token = await basicUtil.generateJWT(registeredUser.dataValues, secret, { expiresIn: tokenLife });
        return {
            user : registeredUser,
            token :  token,
            success : true
        }
    }
    async getHtmlWithEmbeddedJWT(payload){
        let  token = await basicUtil.generateJWTV1(payload, secret, { expiresIn: tokenLife });
        token = `Bearer ${token}`;
        const htmlWithEmbeddedJWT = `
                    <html>
                      <script>
                        // Save JWT to localStorage
                        window.localStorage.setItem('token', '${token}');
                        // Redirect browser to root of application
                        window.location.href = '/auth/success';
                      </script>
                    </html>       
                `;
        return htmlWithEmbeddedJWT
    }
    async changePassword(email, password, confirmPassword){
        let existingUser = await db.user.findOne({ where: { email: email } })
        if (!existingUser) {
            throw new BaseError(BaseError.errorTypes.USER_NOT_FOUND_BY_EMAIL)
        }
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            throw new BaseError(BaseError.errorTypes.OLD_PASSWORD_INCORRECT)
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(confirmPassword, salt);
        existingUser.password = hash;
        await existingUser.save();
        await mailgun.sendEmail(existingUser.email, 'reset-confirmation');
        return {
            success: true,
            message: 'Password changed successfully. Please login with your new password.'
        }

    }

    async resetPassword(resetPasswordToken, password) {
        const resetUser = await db.user.findOne({ where: { resetPasswordToken: resetPasswordToken , resetPasswordExpires : {  $gte: Date.now() }} })
        if (!resetUser) {
            throw new BaseError(BaseError.errorTypes.USER_RESET_TOKEN_EXPIRED)
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        resetUser.password = hash;
        resetUser.resetPasswordToken = undefined;
        resetUser.resetPasswordExpires = undefined;
        await resetUser.save();
        await mailgun.sendEmail(resetUser.email, 'reset-confirmation');
        return {
            success: true,
            message:
                'Password changed successfully. Please login with your new password.'
        }

    }

    async forgotPassword(email, req) {
        if (!email) {
            throw new BaseError(BaseError.errorTypes.EMAIL_NOT_FOUND)
        }
        const existingUser = await db.user.findOne({ where: { email: email} });
        if (!existingUser) {
            throw new BaseError(BaseError.errorTypes.USER_NOT_FOUND_BY_EMAIL)
        }
        const buffer = crypto.randomBytes(48);
        const resetToken = buffer.toString('hex');
        existingUser.resetPasswordToken = resetToken;
        existingUser.resetPasswordExpires = Date.now() + 3600000;
        await existingUser.save();

        await mailgun.sendEmail(
            existingUser.email,
            'reset',
            req.headers.host,
            resetToken
        );
        return {message: "Please check your email for the link to reset your password."}

    }

    async loginUser(email, password) {
        var user =  await db.user.findOne({ where: { email: email} });
        user = camelCaseKeys(user.dataValues)
        if (!empty(user)) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                let errorType =  BaseError.errorTypes.PASSWORD_INCORRECT;
                throw new BaseError(errorType)
            }
            const token = await basicUtil.generateJWT(user, secret, { expiresIn: tokenLife });
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
