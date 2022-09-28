const Userservice = require("../services/userService");
const userService = new Userservice()
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

exports.me = async function (req, res, next) {
    const user = req.user.id;
    try{
        const data = await userService.me(user)
        res.status(200).json({
            user: data
        });
    }catch (e) {
        sendErrorResponse(e, res)
    }


}

