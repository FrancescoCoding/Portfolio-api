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
exports.loginUser = exports.deleteUser = exports.updateUser = exports.getUserById = exports.createUser = exports.getAllUsers = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = __importDefault(require("../models/userModel"));
const db_1 = require("../database/db");
const userSanitizer_1 = require("../sanitizers/userSanitizer");
const httpException_1 = __importDefault(require("../utils/httpException"));
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield userModel_1.default.find();
            if (!users) {
                throw new httpException_1.default("Users not found", 404);
            }
            return users;
        }
        catch (error) {
            throw new httpException_1.default(`Failed to get users: ${error}`, 400);
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
            const newUser = yield userModel_1.default.create(Object.assign(Object.assign({}, sanitizedUser), { password: hashedPassword }));
            if (!newUser) {
                throw new httpException_1.default("User not created", 400);
            }
            return newUser;
        }
        catch (error) {
            throw new httpException_1.default(`Failed to create the user: ${error}`, 400);
        }
    });
}
exports.createUser = createUser;
function getUserById(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, db_1.isObjectIdValid)(userId);
        try {
            const user = yield userModel_1.default.findById(userId);
            if (!user) {
                throw new httpException_1.default("User not found", 404);
            }
            return user;
        }
        catch (error) {
            throw new httpException_1.default(`Error finding the user: ${error}`, 400);
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
            if (!updatedUser) {
                throw new httpException_1.default("User not found", 404);
            }
            return updatedUser;
        }
        catch (error) {
            throw new httpException_1.default(`Error updating the user: ${error}`, 400);
        }
    });
}
exports.updateUser = updateUser;
function deleteUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, db_1.isObjectIdValid)(userId);
        try {
            const user = yield userModel_1.default.findByIdAndDelete(userId);
            if (!user) {
                throw new httpException_1.default("User not found", 404);
            }
            return;
        }
        catch (error) {
            throw new httpException_1.default(`Failed to delete the user: ${error}`, 400);
        }
    });
}
exports.deleteUser = deleteUser;
function loginUser(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const sanitizedUser = yield (0, userSanitizer_1.sanitizeLoginUser)(email, password);
        try {
            const user = yield userModel_1.default.findOne({ email });
            if (!user)
                throw new httpException_1.default("User not found", 404);
            const isPasswordValid = yield bcryptjs_1.default.compare(sanitizedUser.password, user.password);
            if (!isPasswordValid)
                throw new httpException_1.default("Password is invalid", 401);
            return user;
        }
        catch (err) {
            throw new httpException_1.default(`Failed to login user: ${err.message}`, 401);
        }
    });
}
exports.loginUser = loginUser;
