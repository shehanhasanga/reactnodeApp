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
const reviewController = require('../../controllers/reviewController')

router.route('/add').post(auth, reviewController.addReview);
router.route('/delete/:id').delete( reviewController.deleteAddress);
router.route('/').get( reviewController.getAllReviews);
router.route('/:id').get( reviewController.getAddress);
router.route('/:id').put( reviewController.updateAddress);






module.exports = router;
