var log4js = require('log4js');
var config = require('./log4js.conf.json');

// Logger configuration
log4js.configure(config);
var logger = log4js.getLogger();

logger.level = "TRACE";

var httpLogger = log4js.connectLogger(
    log4js.getLogger("http"),
    {
        level: 'auto'
    }
)

module.exports = {
    logger,
    httpLogger
}