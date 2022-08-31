"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController = require("../controllers/userController");
const { getAllUsersHandler, createUserHandler, getUserByIdHandler, updateUserHandler, deleteUserHandler, } = userController;
const userRoutes = express_1.default.Router();
userRoutes.route("/users").get(getAllUsersHandler).post(createUserHandler),
    userRoutes
        .route("/users/:userId")
        .get(getUserByIdHandler)
        .put(updateUserHandler)
        .delete(deleteUserHandler);
exports.default = userRoutes;
