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
const { s3Upload } = require('../utils/storage');

class ProductService{
    constructor() {

    }
    async getProduct(id){
        const productDoc = await db.product.findOne({ where: { id: id } })
        return productDoc.dataValues

    }
    async getAllProducts(){
        let products = []
        const productDocs = await db.product.findAll();
        if (productDocs.length > 0) {
            products = productDocs.map((product) => { return product.dataValues})
        }
        return products
    }
    async searchProductByName(name){
        let products = []
        const productDocs = await db.product.findAll({ where: {
            isActive: true,
            name: { [Op.like]: `%${name}%` }
        } });

        if (productDocs.length > 0) {
            products = productDocs.map((product) => {product.dataValues})
        }
        return products
    }

    async addProduct(data , imageFile){
        const { imageUrl, imageKey } = await s3Upload(imageFile);
        const {sku, name, description, quantity, price, taxable, isActive, brand} =  data
        const productSaved  = await  db.product.create(
            {
                sku,
name, description,quantity,price, taxable,isActive,brand,imageUrl,imageKey
            });
        return productSaved

    }
    async deleteProduct(productId ){
        const productDoc = await db.product.findOne({ where: { id: productId } })
        if(!productDoc){
            throw new BaseError(BaseError.errorTypes.PRODUCT_IS_NOT_FOUND)
        }
    }
    async updateActivate(productId , isActive){
        const productDoc = await db.product.findOne({ where: { id: productId } })
        if(!productDoc){
            throw new BaseError(BaseError.errorTypes.PRODUCT_IS_NOT_FOUND)
        }
        productDoc.update({ isActive  })
        await productDoc.save()
        return  productDoc
    }
    async updateProduct(productId , updateData){
        const productDoc = await db.product.findOne({ where: { id: productId } })
        if(!productDoc){
            throw new BaseError(BaseError.errorTypes.PRODUCT_IS_NOT_FOUND)
        }
        if(updateData.sku){
            const foundProductFromSku = await db.product.findOne({
                where: { sku: updateData.sku }
            });
            if (foundProductFromSku) {
                let foundProductFromSkuData = foundProductFromSku.dataValues
                if(foundProductFromSkuData.id != productId){
                    throw new BaseError(BaseError.errorTypes.PRODUCT_SKU_IS_ALREADY_EXISTS)
                }
            }
        }

        await productDoc.update({ ...updateData })
        await productDoc.save()
        return  productDoc
    }


}
module.exports = ProductService;
