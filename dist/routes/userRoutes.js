"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const userController_1 = require("../controllers/userController");
const { getAllUsersHandler, createUserHandler, getUserByIdHandler, updateUserHandler, deleteUserHandler, loginUserHandler, } = userController_1.userController;
const userRoutes = express_1.default.Router();
userRoutes.route('/').get(authMiddleware_1.protect, getAllUsersHandler).post(createUserHandler);
userRoutes.route('/login').post(loginUserHandler);
userRoutes
    .route('/:userId')
    .get(getUserByIdHandler)
    .put(authMiddleware_1.protect, updateUserHandler)
    .delete(authMiddleware_1.protect, deleteUserHandler);
exports.default = userRoutes;
