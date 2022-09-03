import { Response, Request } from 'express';
import HttpException from '../utils/httpException';
import { NODE_ENV } from '../utils/config';

export const errorHandler = (
    err: HttpException,
    req: Request,
    res: Response
): Response => {
    const status = err.status ?? 500;
    const message = err.message ?? 'Something went wrong';
    const error = err.error ?? null;

    return res.status(status).json({
        message,
        stack: NODE_ENV === 'production' ? null : err.stack,
        error,
    });
};
