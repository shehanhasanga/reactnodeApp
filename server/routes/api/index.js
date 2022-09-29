const router = require('express').Router();

const authRoutes = require('./auth');
const user = require('./user');
const brandRoute = require('./brand');
const productRoute =  require('./product')
router.use('/auth', authRoutes);
router.use('/user', user);
router.use('/brand', brandRoute);
router.use('/product', productRoute);
module.exports = router;
