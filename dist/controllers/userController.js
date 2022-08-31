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
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler = require("express-async-handler");
const userService_1 = require("../services/userService");
//@desc Get all users
//@route GET /api/v1/users
//@access Public
exports.getAllUsersHandler = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, userService_1.getAllUsers)();
    res.status(200).json(users);
}));
//@desc Get a single user by id
//@route GET /api/users/:userId
//@access Public
exports.getUserByIdHandler = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const user = yield (0, userService_1.getUserById)(userId);
    res.status(200).json({ user });
}));
//@desc Create a user
//@route POST /api/users
//@access Public
exports.createUserHandler = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userBody = req.body;
    const createdUser = yield (0, userService_1.createUser)(userBody);
    res.status(201).json({ createdUser });
}));
//@desc Update a user
//@route PUT /api/users/:userId
//@access Private
exports.updateUserHandler = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const userBody = req.body;
    const user = yield (0, userService_1.updateUser)(userId, userBody);
    res.status(200).json({ user });
}));
//@desc Delete a user
//@route DELETE /api/users/:userId
//@access Private
exports.deleteUserHandler = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const username = yield (yield (0, userService_1.getUserById)(userId)).username;
    const user = yield (0, userService_1.deleteUser)(userId);
    res.status(200).json({ message: `User '${username}' deleted`, user });
}));
//@desc Login a user
//@route POST /api/users/login
//@access Public
exports.loginUserHandler = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    const user = yield (0, userService_1.loginUser)(userEmail, userPassword);
    res.status(200).json({ user });
}));
