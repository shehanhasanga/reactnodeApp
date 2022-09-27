const UserService = require("../services/authService");
const userService = new UserService()
const {
    logger
} = require('../config/logger/log4js.init');
exports.welcome = async function (req, res, next) {
    console.log("get req")
    res.status(200).json({
        message : "welcome"
    })
}

exports.loginUser = async function (req, res, next) {
    logger.debug("[user_controller] :: loginUser() Start" + JSON.stringify(req.body));
    try {
        const { email, password } = req.body;
        if (!email) {
            return res
                .status(400)
                .json({ error: 'You must enter an email address.' });
        }

        if (!password) {
            return res.status(400).json({ error: 'You must enter a password.' });
        }
        let {token, user} = await userService.loginUser(email, password)
        res.status(200).json({
            success: true,
            token: `Bearer ${token}`,
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            }
        });
    } catch (e) {
        console.log(e)
        return res.status(e.statusCode).json({ error: e.message });
    }
}
