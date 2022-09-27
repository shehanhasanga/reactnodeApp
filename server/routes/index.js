const router = require('express').Router();
const apiRoutes = require('./api');

const keys = require('../config/keys');
const { apiURL } = keys.app;
const api = `/${apiURL}`;

// api routes
router.use("/api", apiRoutes);
module.exports = router;
