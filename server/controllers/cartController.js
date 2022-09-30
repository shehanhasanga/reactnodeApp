const CartService = require("../services/cartService");
const cartService = new CartService()
const {
    logger
} = require('../config/logger/log4js.init');


const sendErrorResponse = (error, res) => {
    if(error.statusCode){
        return res.status(e.statusCode).json({ error: e.message });
    } else {
        return res.status(e.statusCode).json({ error: e.message });
    }
}

exports.addCart = async function (req, res, next) {
    const user = req.user.id;
    const items = req.body.products;
    try{
        const data = await cartService.addCart(items, user)
        res.status(200).json({
            success: true,
            cartId: data
        });
    }catch (e) {
        sendErrorResponse(e, res)
    }


}


