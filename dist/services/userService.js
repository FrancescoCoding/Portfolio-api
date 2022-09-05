"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.loginUser = exports.deleteUser = exports.updateUser = exports.getUserById = exports.createUser = exports.getAllUsers = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const httpException_1 = __importStar(require("../utils/httpException"));
const userModel_1 = __importDefault(require("../models/userModel"));
const db_1 = require("../database/db");
const userSanitizer_1 = require("../sanitizers/userSanitizer");
const tokenService_1 = require("./tokenService");
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield userModel_1.default.find();
            return users;
        }
        catch (error) {
            throw (0, httpException_1.ErrorHandler)(error);
        }
    });
}
exports.getAllUsers = getAllUsers;
function createUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const sanitizedUser = yield (0, userSanitizer_1.sanitizeUser)(user);
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(sanitizedUser.password, salt);
        try {
            const newUser = yield userModel_1.default.create({
                username: sanitizedUser.username,
                email: sanitizedUser.email,
                password: hashedPassword,
                isAdmin: sanitizedUser.isAdmin,
            });
            return {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
                token: (0, tokenService_1.generateToken)({
                    _id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                    isAdmin: newUser.isAdmin,
                }),
            };
        }
        catch (error) {
            throw (0, httpException_1.ErrorHandler)(error);
        }
    });
}
exports.createUser = createUser;
function getUserById(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, db_1.isObjectIdValid)(userId);
        try {
            const user = yield userModel_1.default.findById(userId);
            if (user == null)
                throw new httpException_1.default('User not found', 404);
            return user;
        }
        catch (error) {
            throw (0, httpException_1.ErrorHandler)(error);
        }
    });
}
exports.getUserById = getUserById;
function updateUser(userId, user) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, db_1.isObjectIdValid)(userId);
        const sanitizedUser = (0, userSanitizer_1.sanitizeUser)(user);
        try {
            const updatedUser = yield userModel_1.default.findByIdAndUpdate(userId, sanitizedUser, { new: true });
            if (updatedUser == null)
                throw new httpException_1.default('User not found', 404);
            return updatedUser;
        }
        catch (error) {
            throw (0, httpException_1.ErrorHandler)(error);
        }
    });
}
exports.updateUser = updateUser;
function deleteUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, db_1.isObjectIdValid)(userId);
        try {
            const user = yield userModel_1.default.findByIdAndDelete(userId);
            if (user == null) {
                throw new httpException_1.default('User not found', 404);
            }
            return;
        }
        catch (error) {
            throw (0, httpException_1.ErrorHandler)(error);
        }
    });
}
exports.deleteUser = deleteUser;
function loginUser(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const sanitizedUser = yield (0, userSanitizer_1.sanitizeLoginUser)(email, password);
        try {
            const user = yield userModel_1.default.findOne({ email });
            if (user == null)
                throw new httpException_1.default('User not found', 404);
            const isPasswordValid = yield bcryptjs_1.default.compare(sanitizedUser.password, user.password);
            if (!isPasswordValid)
                throw new httpException_1.default('Password is invalid', 401);
            return {
                _id: user._id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin,
                token: (0, tokenService_1.generateToken)({
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    isAdmin: user.isAdmin,
                }),
            };
        }
        catch (error) {
            throw (0, httpException_1.ErrorHandler)(error);
        }
    });
}
exports.loginUser = loginUser;
