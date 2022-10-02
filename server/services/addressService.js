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

class AddressService{
    constructor() {

    }

    async addAddress(addressData, userId){
        const addressSaved  = await  db.brand.create(
            {
              ...addressData,
                userid : userId
            });
        return addressSaved
    }
    async findAddressByUserId(userId){
        const addressDoc = await db.address.findOne({ where: { userid: userId} });
        let address =  {}
        if(addressDoc){
            address =  addressDoc.dataValues
        }
        return address
    }
    async getAddress(id){
        const addressDoc = await db.address.findOne({ where: { id: id } });
        let address =  {}
        if(addressDoc){
            address =  addressDoc.dataValues
        } else {
            throw new BaseError(BaseError.errorTypes.ADDRESS_IS_NOT_FOUND)
        }
        return address
    }

    async updateAddress(data, id){
        const addressDoc = await db.address.findOne({ where: { id: id} });
        if(addressDoc){
            await addressDoc.update({ ...data })
            await addressDoc.save()
            return addressDoc.dataValues
        }else {
            throw new BaseError(BaseError.errorTypes.ADDRESS_IS_NOT_FOUND)
        }
    }

    async deleteAddress(id){
        const addressFound = await db.address.findOne({ where: { id: id } })
        if(!addressFound){
            throw new BaseError(BaseError.errorTypes.ADDRESS_IS_NOT_FOUND)
        }
        await addressFound.destroy();
        return true
    }



}
module.exports = AddressService;
