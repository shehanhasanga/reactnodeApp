const UserService = require("../services/authService");
const userService = new UserService()
const {
    logger
} = require('../config/logger/log4js.init');
let message = "Internal Server Error"
let statusCode = 500
exports.welcome = async function (req, res, next) {
    console.log("get req")
    res.status(200).json({
        message : "welcome"
    })
}

const sendErrorResponse = (error, res) => {
    if(error.statusCode){
        return res.status(e.statusCode).json({ error: e.message });
    } else {
        return res.status(e.statusCode).json({ error: e.message });
    }
}

exports.resetPassword = async function (req, res, next) {
    const { password } = req.body;
    let resetPasswordToken = req.params.token;
    if (!password) {
        return res.status(400).json({ error: 'You must enter a password.' });
    }
    try{
        let {message} = await userService.resetPassword(resetPasswordToken, password)
        res.status(200).json({
            success: true,
            message
        });
    } catch (e) {
        logger.debug("[user_controller] :: resetPassword() Error: "  + JSON.stringify(req.body));
        sendErrorResponse(e, res)
    }
}

exports.facebookAuth = async function (req, res, next) {
    const payload = {
        id: req.user.id
    };
   let htmlWithEmbeddedJWT =  await userService.getHtmlWithEmbeddedJWT(payload)
    res.send(htmlWithEmbeddedJWT);
}
exports.googleAuth = async function (req, res, next) {
    const payload = {
        id: req.user.id
    };
    let htmlWithEmbeddedJWT = await userService.getHtmlWithEmbeddedJWT(payload)
    res.send(htmlWithEmbeddedJWT);
}

exports.changePassword = async function (req, res, next) {
    const { password, confirmPassword } = req.body;
    const email = req.user.email;
    if (!email) {
        return res.status(401).send('Unauthenticated');
    }
    if (!password) {
        return res.status(400).json({ error: 'You must enter a password.' });
    }
    try{
        let {message} = await userService.changePassword(resetPasswordToken, password)
        res.status(200).json({
            success: true,
            message
        });
    } catch (e) {
        logger.debug("[user_controller] :: changePassword() Error: "  + JSON.stringify(req.body));
        sendErrorResponse(e, res)
    }
}

// router.post('/reset', auth, async (req, res) => {
//
// }

exports.forgotPassword = async function (req, res, next) {
    logger.debug("[user_controller] :: forgotPassword() Start" + JSON.stringify(req.body));
    const {email} = req.body
    console.log(email)
    try{
        let {message} = await userService.forgotPassword(email, req)
        res.status(200).json({
            success: true,
            message
        });
    }catch (e) {
        logger.debug("[user_controller] :: forgotPassword() Error: "  + JSON.stringify(req.body));
        sendErrorResponse(e, res)
    }
}
exports.registerUser = async function (req, res, next) {
    logger.debug("[user_controller] :: registerUser() Start" + JSON.stringify(req.body));
    try {
        const { email, firstName, lastName, password, isSubscribed } = req.body;
        if (!email) {
            return res
                .status(400)
                .json({ error: 'You must enter an email address.' });
        }
        if (!firstName || !lastName) {
            return res.status(400).json({ error: 'You must enter your full name.' });
        }

        if (!password) {
            return res.status(400).json({ error: 'You must enter a password.' });
        }

        let {token, user} = await userService.registerUser(req.body)
        res.status(200).json({
            success: true,
            token: `Bearer ${token}`,
            user: user
        });

    } catch (e) {
        logger.debug("[user_controller] :: registerUser() Error" + JSON.stringify(req.body));
        return res.status(e.statusCode).json({ error: e.message });
    }
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
