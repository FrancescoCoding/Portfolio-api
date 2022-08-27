"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO_URI = exports.PASSWORD = exports.USER = exports.port = void 0;
require("dotenv").config();
exports.port = process.env.PORT || 3000;
exports.USER = process.env.USER;
exports.PASSWORD = process.env.PASSWORD || "development";
exports.MONGO_URI = process.env.MONGO_URI || null;
