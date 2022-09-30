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
exports.search = async function (req, res, next) {
    const { search } = req.query;
    const regex = new RegExp(search, 'i');
    try {
        let users = await userService.search(search)
        res.status(200).json({
            users
        });
    }catch (e) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }

}
exports.getUsers = async function (req, res, next) {
    const { page = 1, limit = 10 } = req.query;
    let pageLimit = parseInt(limit)
    let pageStart = (page - 1) * limit
    try {
        let {returnData, count} = await userService.getUsers(pageStart, pageLimit)
        res.status(200).json({
            users : returnData,
            totalPages: Math.ceil(count / limit),
            currentPage: Number(page),
            count
        });
    }catch (e) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}
exports.updateUser = async function (req, res, next) {
    const userId = req.user.id;
    const update = req.body.profile;
    const query = { _id: user };
    try{
        let userDoc = await userService.updateUser(update, userId)
        res.status(200).json({
            success: true,
            message: 'Your profile is successfully updated!',
            user: userDoc
        });
    }catch (e) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }

}


