import bcrypt from 'bcryptjs';
import HttpException, { ErrorHandler } from '../utils/httpException';
import UserModel from '../models/userModel';

import { UserReturnType, UserType } from '../types/userTypes';
import { IUserSchema } from '../schema/userSchema';
import { isObjectIdValid } from '../database/db';
import { sanitizeUser, sanitizeLoginUser } from '../sanitizers/userSanitizer';
import { generateToken } from './tokenService';

export async function getAllUsers(): Promise<UserType[]> {
    try {
        const users = await UserModel.find();

        return users;
    } catch (error) {
        throw ErrorHandler(error);
    }
}

export async function createUser(user: UserType): Promise<UserReturnType> {
    const sanitizedUser = await sanitizeUser(user);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(sanitizedUser.password, salt);

    try {
        const newUser = await UserModel.create({
            username: sanitizedUser.username,
            email: sanitizedUser.email,
            password: hashedPassword,
            isAdmin: sanitizedUser.isAdmin,
        });

        return {
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: generateToken({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
            }),
        };
    } catch (error) {
        throw ErrorHandler(error);
    }
}

export async function getUserById(userId: string): Promise<IUserSchema> {
    isObjectIdValid(userId);
    try {
        const user = await UserModel.findById(userId);
        if (user == null) throw new HttpException('User not found', 404);

        return user;
    } catch (error) {
        throw ErrorHandler(error);
    }
}

export async function updateUser(
    userId: string,
    user: UserType
): Promise<IUserSchema> {
    isObjectIdValid(userId);

    const sanitizedUser = sanitizeUser(user);

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            sanitizedUser,
            { new: true }
        );
        if (updatedUser == null) throw new HttpException('User not found', 404);

        return updatedUser;
    } catch (error) {
        throw ErrorHandler(error);
    }
}

export async function deleteUser(userId: string): Promise<void> {
    isObjectIdValid(userId);

    try {
        const user = await UserModel.findByIdAndDelete(userId);

        if (user == null) {
            throw new HttpException('User not found', 404);
        }

        return;
    } catch (error) {
        throw ErrorHandler(error);
    }
}

export async function loginUser(
    email: string,
    password: string
): Promise<UserReturnType> {
    const sanitizedUser = await sanitizeLoginUser(email, password);

    try {
        const user = await UserModel.findOne({ email });
        if (user == null) throw new HttpException('User not found', 404);

        const isPasswordValid = await bcrypt.compare(
            sanitizedUser.password,
            user.password
        );
        if (!isPasswordValid)
            throw new HttpException('Password is invalid', 401);

        return {
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken({
                _id: user._id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin,
            }),
        };
    } catch (error) {
        throw ErrorHandler(error);
    }
}
