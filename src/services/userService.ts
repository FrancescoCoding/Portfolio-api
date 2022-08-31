import UserModel from "../models/userModel";
import { UserBody } from "../types/userTypes";
import { IUserSchema } from "../schema/userSchema";
import { isObjectIdValid } from "../database/db";
import { sanitizeUser } from "../sanitizers/userSanitizer";

export async function getAllUsers(): Promise<UserBody[]> {
  try {
    const users = await UserModel.find();

    if (!users) {
      throw new Error("Users not found");
    }

    return users;
  } catch (error) {
    throw new Error(`Users not found: ${error}`);
  }
}

export async function createUser(user: UserBody): Promise<UserBody> {
  const sanitizedUser = sanitizeUser(user);

  try {
    const newUser = await UserModel.create(sanitizedUser);

    if (!newUser) {
      throw new Error("User could not be created");
    }

    return newUser;
  } catch (error) {
    throw new Error(`Error creating the user: ${error}`);
  }
}

export async function getUserById(userId: string): Promise<IUserSchema> {
  isObjectIdValid(userId);

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw new Error("User could not be found");
    }

    return user;
  } catch (error) {
    throw new Error(`Error finding the user: ${error}`);
  }
}

export async function updateUser(
  userId: string,
  user: UserBody
): Promise<IUserSchema> {
  isObjectIdValid(userId);

  const sanitizedUser = sanitizeUser(user);

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      sanitizedUser,
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User could not be updated");
    }

    return updatedUser;
  } catch (error) {
    throw new Error(`Error updating the user: ${error}`);
  }
}

export async function deleteUser(userId: string): Promise<void> {
  isObjectIdValid(userId);

  try {
    const user = await UserModel.findByIdAndDelete(userId);

    if (!user) {
      throw new Error("User could not be deleted");
    }

    return;
  } catch (error) {
    throw new Error(`Error deleting the user: ${error}`);
  }
}
