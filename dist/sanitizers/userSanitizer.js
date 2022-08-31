"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeLoginUser = exports.sanitizeUser = void 0;
const utils_1 = require("./utils");
const utils_2 = require("./utils");
const httpException_1 = __importDefault(require("../utils/httpException"));
function sanitizeUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        let sanitizedUser = {};
        sanitizedUser.username = (0, utils_1.removeScriptTags)(usernameSanitizer(user.username));
        sanitizedUser.email = (0, utils_1.removeScriptTags)(emailSanitizer(user.email));
        sanitizedUser.isAdmin = isAdminSanitizer(user.isAdmin);
        sanitizedUser.password = yield passwordSanitizer(user.password);
        return sanitizedUser;
    });
}
exports.sanitizeUser = sanitizeUser;
function sanitizeLoginUser(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        let sanitizedUser = {};
        sanitizedUser.email = emailSanitizer(email);
        sanitizedUser.password = yield passwordSanitizer(password);
        return sanitizedUser;
    });
}
exports.sanitizeLoginUser = sanitizeLoginUser;
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
    if (email === undefined) {
        throw new httpException_1.default("Email is undefined", 400);
    }
    if (typeof email !== "string") {
        throw new httpException_1.default("Email is not a string", 400);
    }
    email = email.trim();
    if (email.length < 6) {
        throw new httpException_1.default("Email must be at least 6 characters", 400);
    }
    if (email.length > 50) {
        throw new httpException_1.default("Email mut be less then 50 characters", 400);
    }
    if (!email.match(utils_2.emailRegex)) {
        throw new httpException_1.default("Please add a valid email", 400);
    }
    return email;
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
function passwordSanitizer(password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (password === undefined) {
            throw new httpException_1.default("Password is undefined", 400);
        }
        if (typeof password !== "string") {
            throw new httpException_1.default("Password is not a string", 400);
        }
        password = password.trim();
        if (password.length < 6) {
            throw new httpException_1.default("Password must be at least 6 characters", 400);
        }
        if (password.length > 50) {
            throw new httpException_1.default("Password mut be less then 50 characters", 400);
        }
        return password;
    });
}