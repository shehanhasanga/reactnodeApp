const OrderService = require("../services/orderService");
const orderService = new OrderService()
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

exports.addOrder = async function (req, res, next) {
    const cart = req.body.cartId;
    const total = req.body.total;
    const user = req.user.id;
    try{
        const data = await orderService.addOrder(cart, user, total)
        res.status(200).json({
            success: true,
            message: `Your order has been placed successfully!`,
            order: { _id: data }
        });
    }catch (e) {
        sendErrorResponse(e, res)
    }


}



