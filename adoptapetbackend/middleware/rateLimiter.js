const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, 
    max: 5, // Limit each IP to 5 requests per windowMs
    message: {
        success: false,
        message: "Too many login attempts from this IP. Please try again after 30 minutes."
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    keyGenerator: (req) => req.ip, // Use IP address as the key
});

module.exports = { loginLimiter };
