const router = require('express').Router();

const authRoutes = require('./auth');
const user = require('./user');
const brandRoute = require('./brand');
const productRoute =  require('./product')
const categoryRoute =  require('./category')
const cartRoutes =  require('./cart')
const orderRoutes =  require('./order')

router.use('/auth', authRoutes);
router.use('/user', user);
router.use('/brand', brandRoute);
router.use('/product', productRoute);
router.use('/category', categoryRoute);
router.use('/cart', cartRoutes);
router.use('/order', orderRoutes);

module.exports = router;
