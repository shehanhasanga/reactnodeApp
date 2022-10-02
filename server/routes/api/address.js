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
const addressController = require('../../controllers/addressController')

router.route('/add').post(auth, addressController.addAddress);
router.route('/delete/:id').delete( addressController.deleteAddress);
router.route('/').get( addressController.getAddressByUser);
router.route('/:id').get( addressController.getAddress);
router.route('/:id').put( addressController.updateAddress);






module.exports = router;
