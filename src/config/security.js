const rateLimit = require('express-rate-limit');

const helmet = require('helmet');

const cors = require('cors');

const apiLimiter = rateLimit({

    windowMs:
        15 * 60 * 1000,

    max: 100,

    message:
        'Too many requests from this IP, please try again later.'
});

const securityMiddleware = [
    helmet(),

    cors({

        origin:
            envConfig.nodeEnv ===
            'production'

                ? [
                    'https://yourfrontend.com'
                ]

                : '*',

        credentials: true
    })
];

module.exports = {
    apiLimiter,
    securityMiddleware
};

