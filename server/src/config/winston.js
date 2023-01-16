import * as winston from 'winston'

const { format, transports } = winston

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json(),
        format.prettyPrint(),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    defaultMeta: { service: 'user-service' },
    handleExceptions: true,
    transports: [
        new transports.Console({ filename: 'error.log', level: 'error' }),
        new transports.Console({ filename: 'combined.log' }),
        new transports.File({ filename: 'logs/combined.log', level: 'info' }),
        new transports.File({ filename: 'logs/error.log', level: 'error' })
    ],
    humanReadableUnhandledException: true,
    exitOnError: false
})

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.combine(
            format.colorize(),
            format.simple()
        )
    }))
}

logger.stream = {
    write: function (message, encoding) {
        logger.info(message)
    }
}

export default logger
