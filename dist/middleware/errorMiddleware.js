"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const config_1 = require("../utils/config");
const errorHandler = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    const error = err.error || null;
    res.status(status).json({
        message: message,
        stack: config_1.NODE_ENV === "production" ? null : err.stack,
        error,
    });
};
exports.errorHandler = errorHandler;
