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

class CartService{
    constructor() {

    }
    async addCart(items, userId){
        let products = store.caculateItemsSalesTax(items);
        const t = await db.sequelize.transaction();
        try{
            const cartdata  = await  db.cart.create( { transaction: t });
            const cartId = cartdata.dataValues.id
            products = products.map((product) => {return {...product, cartid: cartId}})
            await db.cartproducts.bulkCreate(products ,  { transaction: t })
            await this.decreaseQuantity(products, t);
            await t.commit();
            return cartId
        }catch (e) {
            await t.rollback();
            throw new BaseError(BaseError.errorTypes.PRODUCT_IS_NOT_FOUND)
        }

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
        // await db.product.update(
        //     {quantity : db.sequelize.literal(`"quantity" - ${}`'"quantity" - "1"')},
        //     {where : {id : ids}}
        //     )

    };



}
module.exports = CartService;
