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
const store = require('../utils/store');

class OrderService{
    constructor() {

    }
    async addOrder(cart, user, total){
        let orderDoc  = await db.order.create({
            userId: user,
            cartitemId: cart,
            total :total
        })

        let order =  orderDoc.dataValues
        let savedOrder =  await db.order.findOne({
            include: [{
                model:db.user
            }],
            where :{id : order.id}
        })
        let savedData = savedOrder.dataValues

        const newOrder = {
            _id: savedOrder.id,
            created: savedOrder.createdAt,
            user: savedOrder.user.dataValues,
            total: savedOrder.total,
            products: savedOrder.products
        };

        await mailgun.sendEmail(newOrder.user.email, 'order-confirmation', newOrder);
        return order.id

    }
     async decreaseQuantity(products, t)  {
        let ids = products.map(item => {
            return item.product
        });
        for(let i = 0 ; i < products.length ; i++) {
            let product = products[i]
            let id =  product.product
            let quantity =  product.quantity

            let prod  = await db.product.findOne({where : {id: id}},{ transaction: t })
            let existingCount = prod.dataValues.quantity
            if(prod){
                await prod.update({ quantity :   existingCount - quantity},{ transaction: t })
                await prod.save({ transaction: t })
            }

        }

    };



}
module.exports = OrderService;
