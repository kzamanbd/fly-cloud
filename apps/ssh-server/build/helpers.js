"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = exports.errorHandler = exports.requestHandler = void 0;
const uuid_1 = require("uuid");
const error_1 = require("./utils/error");
const correlationHeader = 'x-correlation-id';
// request handler
const requestHandler = (req, res, next) => {
    let correlationId = req.headers[correlationHeader];
    if (!correlationId) {
        correlationId = (0, uuid_1.v4)();
        req.headers[correlationHeader] = correlationId;
    }
    res.set(correlationHeader, correlationId);
    return next();
};
exports.requestHandler = requestHandler;
// global error handler
const errorHandler = (err, req, res, next) => {
    const correlationId = req.headers[correlationHeader];
    let code = 500;
    if (err instanceof error_1.GeneralError) {
        code = err.getCode();
    }
    return res.status(code).json({
        correlationId,
        message: err.message
    });
};
exports.errorHandler = errorHandler;
const notFoundHandler = (req, res, next) => {
    const correlationId = req.headers[correlationHeader];
    res.status(404).json({
        correlationId,
        message: 'URL Not Found'
    });
    next();
};
exports.notFoundHandler = notFoundHandler;
//# sourceMappingURL=helpers.js.map