const router = require('express').Router();

const authRoutes = require('./auth');
const user = require('./user');
router.use('/auth', authRoutes);
router.use('/user', user);

module.exports = router;
