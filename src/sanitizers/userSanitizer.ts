import { UserSanitizerType, UserType } from '../types/userTypes';
import { isObjectIdValid } from '../database/db';
import { emailRegex } from './utils';
import HttpException from '../utils/httpException';

export async function sanitizeUser(
    users: UserType
): Promise<UserSanitizerType> {
    const sanitizedUser: UserSanitizerType = {
        username: '',
        email: '',
        password: '',
        isAdmin: false,
    };

    sanitizedUser.username = usernameSanitizer(users.username);
    sanitizedUser.email = emailSanitizer(users.email);
    sanitizedUser.isAdmin = isAdminSanitizer(users.isAdmin);
    sanitizedUser.password = await passwordSanitizer(users.password);

    return sanitizedUser;
}

export async function sanitizeLoginUser(
    email: string,
    password: string
): Promise<UserSanitizerType> {
    // const sanitizedUser = <UserType>{};
    const sanitizedUser: UserSanitizerType = {
        username: '',
        email: '',
        password: '',
        isAdmin: false,
    };

    sanitizedUser.email = emailSanitizer(email);
    sanitizedUser.password = await passwordSanitizer(password);

    return sanitizedUser;
}

function usernameSanitizer(username: string): string {
    if (username === undefined) {
        throw new HttpException('Username is undefined', 400);
    }
    if (typeof username !== 'string') {
        throw new HttpException('Username is not a string', 400);
    }

    username = username.trim();

    return username;
}

function emailSanitizer(email: string): string {
    if (email === undefined) {
        throw new HttpException('Email is undefined', 400);
    }
    if (typeof email !== 'string') {
        throw new HttpException('Email is not a string', 400);
    }

    email = email.trim();
    if (email.length < 6) {
        throw new HttpException('Email must be at least 6 characters', 400);
    }
    if (email.length > 50) {
        throw new HttpException('Email mut be less then 50 characters', 400);
    }
    if (email.match(emailRegex) == null) {
        throw new HttpException('Please add a valid email', 400);
    }

    return email;
}

function isAdminSanitizer(isAdmin: boolean): boolean {
    if (typeof isAdmin !== 'boolean') {
        throw new HttpException('IsAdmin must be a boolean', 400);
    }

    if (!isAdmin) {
        return false;
    }

    return isAdmin;
}

async function passwordSanitizer(password: string): Promise<string> {
    if (password === undefined) {
        throw new HttpException('Password is undefined', 400);
    }
    if (typeof password !== 'string') {
        throw new HttpException('Password is not a string', 400);
    }

    password = password.trim();
    if (password.length < 6) {
        throw new HttpException('Password must be at least 6 characters', 400);
    }
    if (password.length > 50) {
        throw new HttpException('Password mut be less then 50 characters', 400);
    }

    return password;
}

export function sanitizeId(id: string | undefined): string {
    if (id === undefined) {
        throw new HttpException('UserId is undefined', 400);
    }
    isObjectIdValid(id);

    return id.valueOf();
}
