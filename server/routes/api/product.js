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
const productController = require('../../controllers/productController')
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
router.route('/list/search/:name').get( productController.searchProductByName);
router.route('/list').get( productController.getAllProducts);
router.route('/list/brand/:slug').get( productController.getAllProducts);
router.route('/list/select').get( productController.getAllProducts);
router.route('/add').post(   upload.single('image'),productController.addProduct);
router.route('/').get( productController.getAllProducts);
router.route('/:id').get( productController.getProduct);
router.route('/:id').put( productController.updateProduct);
router.route('/:id/active').put( productController.updateActive);
router.route('/delete/:id').put( productController.deleteProduct);








module.exports = router;
