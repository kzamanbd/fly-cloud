"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFound = exports.BadRequest = exports.GeneralError = exports.HttpCode = void 0;
var HttpCode;
(function (HttpCode) {
    HttpCode[HttpCode["OK"] = 200] = "OK";
    HttpCode[HttpCode["NO_CONTENT"] = 204] = "NO_CONTENT";
    HttpCode[HttpCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpCode[HttpCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpCode[HttpCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpCode[HttpCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(HttpCode || (exports.HttpCode = HttpCode = {}));
class GeneralError extends Error {
    constructor(message) {
        super();
        this.message = message;
    }
    getCode() {
        return HttpCode.INTERNAL_SERVER_ERROR;
    }
}
exports.GeneralError = GeneralError;
class BadRequest extends GeneralError {
    constructor(message, code) {
        super(message);
        this.name = "BadRequest";
    }
    getCode() {
        return HttpCode.BAD_REQUEST;
    }
}
exports.BadRequest = BadRequest;
class NotFound extends GeneralError {
    constructor(message) {
        super(message);
        this.name = "NotFound";
    }
    getCode() {
        return HttpCode.NOT_FOUND;
    }
}
exports.NotFound = NotFound;
//# sourceMappingURL=error.js.map