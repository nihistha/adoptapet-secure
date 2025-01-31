const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const path = require('path');

// Log format
const logFormat = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => `[${timestamp}] ${level.toUpperCase()}: ${message}`)
);

// Rotate logs daily to prevent large files
const logTransport = (filename, level) => new transports.DailyRotateFile({
    filename: path.join(__dirname, 'logs', filename),
    datePattern: 'YYYY-MM-DD',
    level: level,
    maxSize: '20m',
    maxFiles: '30d' // Keep logs for 30 days
});

// Create Winston logger instance
const logger = createLogger({
    format: logFormat,
    transports: [
        logTransport('access-%DATE%.log', 'info'), // General logs
        logTransport('security-%DATE%.log', 'security'), // Security logs
        logTransport('error-%DATE%.log', 'error'), // Error logs
        new transports.Console({ format: format.simple() }) // Console logging
    ]
});

module.exports = logger;
