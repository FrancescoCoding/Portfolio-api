import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/tokenService';
import { getUserById } from '../services/userService';
import { UserType } from '../types/userTypes';
import HttpException from '../utils/httpException';

const asyncHandler = require('express-async-handler');

export interface GetUserAuthInfoRequest extends Request {
    user: UserType;
}

export const protect = asyncHandler(
    async (req: GetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        if (
            !req.headers ||
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer ')
        ) {
            throw new HttpException('Unauthorized', 401);
        }

        const token = req.headers.authorization.split(' ')[1];
        const decoded = await verifyToken(token);

        if (!decoded) {
            throw new HttpException('Unauthorized', 401);
        }

        req.user = await getUserById(decoded._id);
        next();
    }
);
