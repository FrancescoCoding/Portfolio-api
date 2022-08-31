import express from "express";

const userController = require("../controllers/userController");

const {
  getAllUsersHandler,
  createUserHandler,
  getUserByIdHandler,
  updateUserHandler,
  deleteUserHandler,
} = userController;

const userRoutes = express.Router();

userRoutes.route("/users").get(getAllUsersHandler).post(createUserHandler),
  userRoutes
    .route("/users/:userId")
    .get(getUserByIdHandler)
    .put(updateUserHandler)
    .delete(deleteUserHandler);

export default userRoutes;
