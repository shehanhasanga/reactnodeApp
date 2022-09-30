const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const passport = require('passport');

const auth = require('../../middleware/auth');

// Bring in Models & Helpers
const User = require('../../models/user');
const mailchimp = require('../../utils/mailchimp');
const mailgun = require('../../utils/mailgun');
const keys = require('../../config/keys');

const { secret, tokenLife } = keys.jwt;
const orderController = require('../../controllers/orderController')

router.route('/add').post(auth, orderController.addOrder);
// router.route('/search').get( userController.search);
// router.route('/').get( userController.getUsers);
// router.route('/').put( userController.updateUser);






module.exports = router;
