"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
class HttpException extends Error {
    constructor(message, status, error) {
        super(message);
        this.status = status;
        this.message = message;
        this.error = error !== null && error !== void 0 ? error : null;
    }
}
exports.default = HttpException;
function ErrorHandler(error) {
    if (error instanceof HttpException) {
        throw new HttpException(`Failed to get users: ${error.message}`, 400);
    }
    else {
        console.log(error);
        throw new HttpException('Unknown error occured', 500);
    }
}
exports.ErrorHandler = ErrorHandler;
