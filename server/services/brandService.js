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


class BrandService{
    constructor() {

    }
    async addBrand(brand){

        const brandSaved  = await  db.brand.create(
            {
                name:  brand.name,
                description: brand.description,
                isActive : brand.isActive
            });
        return brandSaved.dataValues
    }

    async getBrandList(){
        const brands = await db.brand.findAll({ where: { isActive: true } })
        let brandsList =  brands.map((brand) => {
            let data = brand.dataValues
            let id = data.id
            data = {...data, value: id}
             return data
        } )
        return brandsList
    }
    async getBrand(brandId){
        const brand = await db.brand.findOne({ where: { id: brandId } })
        return brand.dataValues
    }

    async updateBrand(brand, id){
        const brandFound = await db.brand.findOne({ where: { id: id } })
        if(!brandFound){
            throw new BaseError(BaseError.errorTypes.BRAND_NOT_FOUND)
        }
        brandFound.name =  brand.name
        brandFound.description = brand.description
        await brandFound.save()
        return brandFound.dataValues
    }
    async updateActivate(isActivated, id){
        const brandFound = await db.brand.findOne({ where: { id: id } })
        if(!brandFound){
            throw new BaseError(BaseError.errorTypes.BRAND_NOT_FOUND)
        }
        brandFound.isActive = isActivated;
        await brandFound.save()
        return brandFound.dataValues
    }
    async deleteBrand(id){
        const brandFound = await db.brand.findOne({ where: { id: id } })
        if(!brandFound){
            throw new BaseError(BaseError.errorTypes.BRAND_NOT_FOUND)
        }
        await brandFound.destroy();
        return true
    }

}
module.exports = BrandService;
