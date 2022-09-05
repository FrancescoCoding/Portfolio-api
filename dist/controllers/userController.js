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
exports.userController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userService_1 = require("../services/userService");
// @desc Get all users
// @route GET /api/v1/users
// @access Public
const getAllUsersHandler = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, userService_1.getAllUsers)();
    res.status(200).json(users);
}));
// @desc Get a single user by id
// @route GET /api/users/:userId
// @access Public
const getUserByIdHandler = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const user = yield (0, userService_1.getUserById)(userId);
    res.status(200).json({ user });
}));
// @desc Create a user
// @route POST /api/users
// @access Public
const createUserHandler = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userBody = req.body;
    const createdUser = yield (0, userService_1.createUser)(userBody);
    res.status(201).json({ createdUser });
}));
// @desc Update a user
// @route PUT /api/users/:userId
// @access Private
const updateUserHandler = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const userBody = req.body;
    const user = yield (0, userService_1.updateUser)(userId, userBody);
    res.status(200).json({ user });
}));
// @desc Delete a user
// @route DELETE /api/users/:userId
// @access Private
const deleteUserHandler = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const username = yield (yield (0, userService_1.getUserById)(userId)).username;
    const user = yield (0, userService_1.deleteUser)(userId);
    res.status(200).json({ message: `User '${username}' deleted`, user });
}));
// @desc Login a user
// @route POST /api/users/login
// @access Public
const loginUserHandler = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    const user = yield (0, userService_1.loginUser)(userEmail, userPassword);
    res.status(200).json({ user });
}));
// export userController
exports.userController = {
    getAllUsersHandler,
    getUserByIdHandler,
    createUserHandler,
    updateUserHandler,
    deleteUserHandler,
    loginUserHandler,
};
