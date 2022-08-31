import { UserBody } from "../types/userTypes";
import { removeScriptTags } from "./utils";
import { emailRegex } from "./utils";
import HttpException from "../utils/httpException";

export function sanitizeUser(user: UserBody) {
  let sanitizedUser = <UserBody>{};

  sanitizedUser.username = removeScriptTags(usernameSanitizer(user.username));
  sanitizedUser.email = removeScriptTags(emailSanitizer(user.email));
  sanitizedUser.isAdmin = isAdminSanitizer(user.isAdmin);
  sanitizedUser.password = user.password;

  return sanitizedUser;
}

function usernameSanitizer(username: string) {
  if (!username) {
    throw new HttpException("Username is required", 400);
  }
  if (typeof username !== "string") {
    throw new HttpException("Username must be a string", 400);
  }

  username = username.trim();

  if (username.length < 3 || username.length > 50) {
    throw new HttpException(
      "Username must be between 3 and 50 characters",
      400
    );
  }

  return removeScriptTags(username.replace(/[<>]/g, ""));
}

function emailSanitizer(email: string) {
  if (!email) {
    throw new HttpException("Email is required", 400);
  }
  if (typeof email !== "string") {
    throw new HttpException("Email must be a string", 400);
  }

  email = email.trim();

  if (email.length < 6 || email.length > 50) {
    throw new HttpException("Email must be between 6 and 50 characters", 400);
  }

  if (!email.match(emailRegex)) {
    throw new HttpException("Email is invalid", 400);
  }

  return removeScriptTags(email.replace(/[<>]/g, ""));
}

function isAdminSanitizer(isAdmin: boolean) {
  if (!isAdmin) {
    return false;
  }

  if (typeof isAdmin !== "boolean") {
    throw new HttpException("IsAdmin must be a boolean", 400);
  }

  return isAdmin;
}
