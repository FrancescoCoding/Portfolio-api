"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController = require("../controllers/userController");
const { getAllUsersHandler, createUserHandler, getUserByIdHandler, updateUserHandler, deleteUserHandler, loginUserHandler, } = userController;
const userRoutes = express_1.default.Router();
userRoutes.route("/").get(getAllUsersHandler).post(createUserHandler),
    userRoutes.route("/login").post(loginUserHandler),
    userRoutes
        .route("/:userId")
        .get(getUserByIdHandler)
        .put(updateUserHandler)
        .delete(deleteUserHandler);
exports.default = userRoutes;