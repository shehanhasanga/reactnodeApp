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
const brandController = require('../../controllers/brandController')

router.route('/add').post( brandController.addBrand);
router.route('/list').get( brandController.getBrandList);
router.route('/').get( brandController.getBrandList);
router.route('/:id').get( brandController.getBrand);
router.route('/:id').put( brandController.updateBrand);
router.route('/delete/:id').delete( brandController.deleteBrand);
router.route('/:id/active').put( brandController.activateBrand);
router.route('/list/select').get( brandController.getBrandListSelect);

module.exports = router;
