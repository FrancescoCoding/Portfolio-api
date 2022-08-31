import express from "express";

const userController = require("../controllers/userController");

const {
  getAllUsersHandler,
  createUserHandler,
  getUserByIdHandler,
  updateUserHandler,
  deleteUserHandler,
  loginUserHandler,
} = userController;

const userRoutes = express.Router();

userRoutes.route("/").get(getAllUsersHandler).post(createUserHandler),
  userRoutes.route("/login").post(loginUserHandler),
  userRoutes
    .route("/:userId")
    .get(getUserByIdHandler)
    .put(updateUserHandler)
    .delete(deleteUserHandler);

export default userRoutes;
