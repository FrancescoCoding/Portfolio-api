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
    // Check error Type
    if (!(error instanceof Error)) {
        throw new HttpException('Encountered unknown error type', 500);
    }
    // Check for known errors
    if (error.message.includes('E11000')) {
        throw new HttpException('Object with that ID already exists', 500);
    }
    // Catch all unknown / unthought of errors
    throw new HttpException('Unknown error occurred', 500);
}
exports.ErrorHandler = ErrorHandler;
