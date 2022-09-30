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
const categoryController = require('../../controllers/categoryController')

router.route('/add').post(categoryController.addCategory);
router.route('/list').get(categoryController.getCategoryList);
router.route('/').get(categoryController.getCategoryList);
router.route('/:id').get(categoryController.getCategory);
router.route('/:id').put(categoryController.updateCategory);



module.exports = router;
