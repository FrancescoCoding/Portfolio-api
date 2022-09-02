"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.NODE_ENV = exports.MONGO_URI = exports.PORT = void 0;
require("dotenv").config();
exports.PORT = process.env.PORT || 3000;
exports.MONGO_URI = process.env.MONGO_URI || null;
exports.NODE_ENV = process.env.NODE_ENV || "development";
exports.JWT_SECRET = process.env.JWT_SECRET || "";
