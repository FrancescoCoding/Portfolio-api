import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

import {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser,
    loginUser,
} from '../services/userService';

// @desc Get all users
// @route GET /api/v1/users
// @access Public
export const getAllUsersHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const users = await getAllUsers();
        res.status(200).json(users);
    }
);

// @desc Get a single user by id
// @route GET /api/users/:userId
// @access Public
export const getUserByIdHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const userId = req.params.userId;

        const user = await getUserById(userId);

        res.status(200).json({ user });
    }
);

// @desc Create a user
// @route POST /api/users
// @access Public
export const createUserHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const userBody = req.body;

        const createdUser = await createUser(userBody);

        res.status(201).json({ createdUser });
    }
);

// @desc Update a user
// @route PUT /api/users/:userId
// @access Private
export const updateUserHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const userId = req.params.userId;
        const userBody = req.body;

        const user = await updateUser(userId, userBody);

        res.status(200).json({ user });
    }
);

// @desc Delete a user
// @route DELETE /api/users/:userId
// @access Private
export const deleteUserHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const userId = req.params.userId;

        const username = await (await getUserById(userId)).username;
        const user = await deleteUser(userId);

        res.status(200).json({ message: `User '${username}' deleted`, user });
    }
);

// @desc Login a user
// @route POST /api/users/login
// @access Public
export const loginUserHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const userEmail = req.body.email;
        const userPassword = req.body.password;

        const user = await loginUser(userEmail, userPassword);

        res.status(200).json({ user });
    }
);
