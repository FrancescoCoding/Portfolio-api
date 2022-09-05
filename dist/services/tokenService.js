"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../utils/config");
const httpException_1 = __importDefault(require("../utils/httpException"));
function generateToken(user) {
    return jsonwebtoken_1.default.sign(user, config_1.JWT_SECRET, {
        expiresIn: '1d',
    });
}
exports.generateToken = generateToken;
function verifyToken(token) {
    try {
        return jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
    }
    catch (error) {
        throw new httpException_1.default('Invalid token', 401);
    }
}
exports.verifyToken = verifyToken;
