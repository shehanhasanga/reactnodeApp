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

class ReviewService{
    constructor() {

    }

    async addReview(data,userId, productId){
        const reviewSaved  = await  db.review.create(
            {
                isRecommended: data.isRecommended,
                rating: data.rating,
                review: data.review,
                title: data.title,
                userid : userId,
                productid : productId
            });
        return reviewSaved
    }
    async getAllReviews(offset, limit){
        let returnData = []
        let count = await db.review.count();
        let data = await db.review.findAll({
            offset,
            limit})
        if (data.length > 0) {
            returnData = data.map((review) => {return review.dataValues})
        }
        return {returnData, count}
    }
    async getReview(prodName){
        let data = await db.product.findAll({
            include: [{
                model: db.brand
            }],
            where : {
                name :  {[Op.like]: `%${prodName}%`}
            }})
        if(data.length > 0){
            let product = data.length[0].dataValues
            let brand  = product.brand.dataValues
            const hasNoBrand =
                brand === null || brand.isActive === false;
            if (!product || hasNoBrand) {
                throw new BaseError(BaseError.errorTypes.BRAND_NOT_FOUND)
            }
            const reviewDoc = await db.review.findOne({ where: { productid: product.id} });
            return reviewDoc


        }


    }

    async updateReview(data, id){
        const reviewDoc = await db.review.findOne({ where: { id: id} });
        if(reviewDoc){
            await reviewDoc.update({ ...data })
            await reviewDoc.save()
            return reviewDoc.dataValues
        }else {
            throw new BaseError(BaseError.errorTypes.REVIEW_IS_NOT_FOUND)
        }
    }




    async deleteReview(id){
        const review = await db.review.findOne({ where: { id: id } })
        if(!review){
            throw new BaseError(BaseError.errorTypes.REVIEW_IS_NOT_FOUND)
        }
        await review.destroy();
        return true
    }



}
module.exports = ReviewService;
