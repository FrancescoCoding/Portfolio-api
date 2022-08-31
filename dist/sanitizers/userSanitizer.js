"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeUser = void 0;
const utils_1 = require("./utils");
const utils_2 = require("./utils");
const httpException_1 = __importDefault(require("../utils/httpException"));
function sanitizeUser(user) {
    let sanitizedUser = {};
    sanitizedUser.username = (0, utils_1.removeScriptTags)(usernameSanitizer(user.username));
    sanitizedUser.email = (0, utils_1.removeScriptTags)(emailSanitizer(user.email));
    sanitizedUser.isAdmin = isAdminSanitizer(user.isAdmin);
    sanitizedUser.password = user.password;
    return sanitizedUser;
}
exports.sanitizeUser = sanitizeUser;
function usernameSanitizer(username) {
    if (!username) {
        throw new httpException_1.default("Username is required", 400);
    }
    if (typeof username !== "string") {
        throw new httpException_1.default("Username must be a string", 400);
    }
    username = username.trim();
    if (username.length < 3 || username.length > 50) {
        throw new httpException_1.default("Username must be between 3 and 50 characters", 400);
    }
    return (0, utils_1.removeScriptTags)(username.replace(/[<>]/g, ""));
}
function emailSanitizer(email) {
    if (!email) {
        throw new httpException_1.default("Email is required", 400);
    }
    if (typeof email !== "string") {
        throw new httpException_1.default("Email must be a string", 400);
    }
    email = email.trim();
    if (email.length < 6 || email.length > 50) {
        throw new httpException_1.default("Email must be between 6 and 50 characters", 400);
    }
    if (!email.match(utils_2.emailRegex)) {
        throw new httpException_1.default("Email is invalid", 400);
    }
    return (0, utils_1.removeScriptTags)(email.replace(/[<>]/g, ""));
}
function isAdminSanitizer(isAdmin) {
    if (!isAdmin) {
        return false;
    }
    if (typeof isAdmin !== "boolean") {
        throw new httpException_1.default("IsAdmin must be a boolean", 400);
    }
    return isAdmin;
}
