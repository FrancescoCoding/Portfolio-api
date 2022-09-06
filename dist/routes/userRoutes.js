"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const userController_1 = require("../controllers/userController");
const userRoutes = express_1.default.Router();
userRoutes.route('/').get(authMiddleware_1.protect, userController_1.getAllUsersHandler).post(userController_1.createUserHandler);
userRoutes.route('/login').post(userController_1.loginUserHandler);
userRoutes
    .route('/:userId')
    .get(userController_1.getUserByIdHandler)
    .put(authMiddleware_1.protect, userController_1.updateUserHandler)
    .delete(authMiddleware_1.protect, userController_1.deleteUserHandler);
exports.default = userRoutes;
