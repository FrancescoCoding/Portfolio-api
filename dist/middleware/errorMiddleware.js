"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const config_1 = require("../utils/config");
const errorHandler = (err, req, res) => {
    var _a, _b, _c;
    const status = (_a = err.status) !== null && _a !== void 0 ? _a : 500;
    const message = (_b = err.message) !== null && _b !== void 0 ? _b : 'Something went wrong';
    const error = (_c = err.error) !== null && _c !== void 0 ? _c : null;
    return res.status(status).json({
        message,
        stack: config_1.NODE_ENV === 'production' ? null : err.stack,
        error,
    });
};
exports.errorHandler = errorHandler;
