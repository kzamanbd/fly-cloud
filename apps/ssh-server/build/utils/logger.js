"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLogger = exports.infoLogger = exports.logger = void 0;
const express_winston_1 = __importDefault(require("express-winston"));
const winston_1 = require("winston");
const logFormat = winston_1.format.printf(({ level, message, timestamp, stack }) => `${timestamp}: ${level} - ${stack || message}`);
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'blue',
    http: 'green',
    verbose: 'cyan',
    debug: 'white'
};
exports.logger = (0, winston_1.createLogger)({
    level: 'debug',
    format: winston_1.format.combine(winston_1.format.colorize({ colors }), winston_1.format.timestamp({ format: 'DD/MM/YYYY || HH:mm:ss' }), winston_1.format.errors({ stack: true }), logFormat),
    transports: [new winston_1.transports.Console()]
});
const getLogMessage = (req, res) => {
    const msgObj = {
        request: req.body,
        correlationId: req.headers['x-correlation-id']
    };
    return JSON.stringify(msgObj);
};
exports.infoLogger = express_winston_1.default.logger({
    transports: [
        new winston_1.transports.Console({
            format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.cli({ colors })),
            handleExceptions: true
        })
    ],
    format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.json()),
    meta: false,
    msg: getLogMessage
});
exports.errorLogger = express_winston_1.default.errorLogger({
    transports: [
        new winston_1.transports.Console({
            format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.cli({ colors })),
            handleExceptions: true
        })
    ],
    format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.json()),
    meta: true,
    msg: '{ "correlationId": "{{req.headers["x-correlation-id"]}}", "error" : "{{err.message}}" }'
});
//# sourceMappingURL=logger.js.map