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


class CategoryService{
    constructor() {

    }
    async deleteCategory(id) {
        const categoryDoc =  await  db.category.findOne({ where: { id: id } })
        if (!categoryDoc) {
            throw new BaseError(BaseError.errorTypes.CATEGORY_IS_NOT_FOUND)
        }
        await categoryDoc.destroy()

    }
    async activateCategory(isActivate , id) {
        const categoryDoc =  await  db.category.findOne({ where: { id: id } })
        if (!categoryDoc) {
            throw new BaseError(BaseError.errorTypes.CATEGORY_IS_NOT_FOUND)
        }
        await categoryDoc.update({ isActivate : isActivate })
        await categoryDoc.save()
        return  categoryDoc
    }
    async updateCategory(data , id) {
        const categoryDoc =  await  db.category.findOne({ where: { id: id } })
        if (!categoryDoc) {
            throw new BaseError(BaseError.errorTypes.CATEGORY_IS_NOT_FOUND)
        }
        await categoryDoc.update({ ...data })
        await categoryDoc.save()
        if(data.products.length > 0){
            db.productcategory.destroy({where : {categoryid : id}})
            let productArray = []
            for(let i = 0 ; i < data.products.length ; i++){
                let product = data.products[i]
                let datanew = {
                    productid : product,
                    categoryid : id
                }
                productArray.push(datanew)
            }

            await db.productcategory.bulkCreate(productArray)
        }
        return  categoryDoc
    }
    async getCategory(id) {
        const categoryDoc =  await  db.category.findOne({
            include: [{
                model:db.product
            }],
            where: { id: id }
        })

        if (!categoryDoc) {
            throw new BaseError(BaseError.errorTypes.CATEGORY_IS_NOT_FOUND)
        }
        return categoryDoc
    }
    async getCategoryList(){
        const categorySaved =  await  db.category.findAll()
        return categorySaved
    }
    async addCategory(category){
        const categorySaved =  await  db.category.create(
            {
                name:  category.name,
                description: category.description,
                isActive : category.isActive
            });
        let newId = categorySaved.dataValues.id
        if(category.products.length > 0){
            let productArray = []
            for(let i = 0 ; i < category.products.length ; i++){
                let product = category.products[i]
                let data = {
                    productid : product,
                    categoryid : newId
                }
                productArray.push(data)
            }

            await db.productcategory.bulkCreate(productArray)
        }
        return  categorySaved
    }


}
module.exports = CategoryService;
