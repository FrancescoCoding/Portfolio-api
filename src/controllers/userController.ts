import { Request, Response, NextFunction } from "express";
const asyncHandler = require("express-async-handler");

import {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
} from "../services/userService";

//@desc Get all users
//@route GET /api/v1/users
//@access Public
exports.getAllUsersHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await getAllUsers();
    res.status(200).json(users);
  }
);

//@desc Get a single user by id
//@route GET /api/users/:userId
//@access Public
exports.getUserByIdHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    const user = await getUserById(userId);

    res.status(200).json({ user });
  }
);

//@desc Create a user
//@route POST /api/users
//@access Private
exports.createUserHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userBody = req.body;

    const createdUser = await createUser(userBody);

    res.status(201).json({ createdUser });
  }
);

//@desc Update a user
//@route PUT /api/users/:userId
//@access Private
exports.updateUserHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    const userBody = req.body;

    const user = await updateUser(userId, userBody);

    res.status(200).json({ user });
  }
);

//@desc Delete a user
//@route DELETE /api/users/:userId
//@access Private
exports.deleteUserHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    const username = await (await getUserById(userId)).username;
    const user = await deleteUser(userId);

    res.status(200).json({ message: `User '${username}' deleted`, user });
  }
);
