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


class Userservice{
    constructor() {

    }
    async me(userId){
        const userDoc = await db.user.findOne({ where: { id: userId} });
        return userDoc.dataValues
    }


}
module.exports = Userservice;
