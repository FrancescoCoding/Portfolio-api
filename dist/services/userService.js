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
exports.deleteUser = exports.updateUser = exports.getUserById = exports.createUser = exports.getAllUsers = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const db_1 = require("../database/db");
const userSanitizer_1 = require("../sanitizers/userSanitizer");
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield userModel_1.default.find();
            if (!users) {
                throw new Error("Users not found");
            }
            return users;
        }
        catch (error) {
            throw new Error(`Users not found: ${error}`);
        }
    });
}
exports.getAllUsers = getAllUsers;
function createUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const sanitizedUser = (0, userSanitizer_1.sanitizeUser)(user);
        try {
            const newUser = yield userModel_1.default.create(sanitizedUser);
            if (!newUser) {
                throw new Error("User could not be created");
            }
            return newUser;
        }
        catch (error) {
            throw new Error(`Error creating the user: ${error}`);
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
                throw new Error("User could not be found");
            }
            return user;
        }
        catch (error) {
            throw new Error(`Error finding the user: ${error}`);
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
                throw new Error("User could not be updated");
            }
            return updatedUser;
        }
        catch (error) {
            throw new Error(`Error updating the user: ${error}`);
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
                throw new Error("User could not be deleted");
            }
            return;
        }
        catch (error) {
            throw new Error(`Error deleting the user: ${error}`);
        }
    });
}
exports.deleteUser = deleteUser;
