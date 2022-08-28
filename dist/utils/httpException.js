"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpException extends Error {
    constructor(message, status, error) {
        super(message);
        this.status = status;
        this.message = message;
        this.error = error || null;
    }
}
exports.default = HttpException;
