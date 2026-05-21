const winston = require('winston');

const envConfig = require('./env');

const logger =
    winston.createLogger({

        level:
            envConfig.nodeEnv === 'development' ? 'debug' : 'info',

        format:
            winston.format.combine(

                winston.format.timestamp(),

                winston.format.printf(
                    ({
                        level,
                        message,
                        timestamp
                    }) => {

                        return `${timestamp} [${level.toUpperCase()}]: ${message}`;
                    }
                )
            ),

        transports: [

            new winston.transports.Console(),

            new winston.transports.File({
                filename: 'logs/error.log',
                level: 'error'
            }),

            new winston.transports.File({
                filename: 'logs/combined.log'
            })
        ]
    });

module.exports = logger;