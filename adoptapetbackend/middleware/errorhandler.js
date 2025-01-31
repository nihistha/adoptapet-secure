const logger = require('../logger/logger');

module.exports = (err, req, res, next) => {
    logger.error(`Error: ${err.message} - Route: ${req.originalUrl} - IP: ${req.ip}`);
    res.status(500).json({ message: 'Internal Server Error' });
};
