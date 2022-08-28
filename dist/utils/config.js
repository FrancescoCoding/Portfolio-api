"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NODE_ENV = exports.MONGO_URI = exports.PASSWORD = exports.USER = exports.port = void 0;
require("dotenv").config();
exports.port = process.env.PORT || 3000;
exports.USER = process.env.USER;
exports.PASSWORD = process.env.PASSWORD || null;
exports.MONGO_URI = process.env.MONGO_URI || null;
exports.NODE_ENV = process.env.NODE_ENV || "development";
