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
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class Userservice{
    constructor() {

    }
    async updateUser(data, id){
        const userDoc = await db.user.findOne({ where: { id: id} });
        if(userDoc){
            await userDoc.update({ ...data })
            await userDoc.save()
            return userDoc.dataValues
        }else {
            throw new BaseError(BaseError.errorTypes.USER_NOT_FOUND)
        }
    }
    async getUsers(offset, limit) {
        let returnData = []
        let count = await db.user.count();
        let usersData = await db.user.findAll({
            offset,
            limit})

        if (usersData.length > 0) {
            returnData = usersData.map((user) => {return user.dataValues})
        }
        return {returnData, count}
    }



    async search(search){
        let returnData = []
        let usersData = await db.user.findAll({where : {
                firstName :  {[Op.like]: `%${search}%`}
            }})
        if (usersData.length > 0) {
            returnData = usersData.map((user) => {return user.dataValues})
        }
        return returnData
    }
    async me(userId){
        const userDoc = await db.user.findOne({ where: { id: userId} });
        return userDoc.dataValues
    }


}
module.exports = Userservice;
