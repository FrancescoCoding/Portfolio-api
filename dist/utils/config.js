"use strict";
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.NODE_ENV = exports.MONGO_URI = exports.PORT = void 0;
exports.PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
exports.MONGO_URI = (_b = process.env.MONGO_URI) !== null && _b !== void 0 ? _b : null;
exports.NODE_ENV = (_c = process.env.NODE_ENV) !== null && _c !== void 0 ? _c : 'development';
exports.JWT_SECRET = (_d = process.env.JWT_SECRET) !== null && _d !== void 0 ? _d : '';
