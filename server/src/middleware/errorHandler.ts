import { NextFunction, Request, Response } from 'express';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof JsonWebTokenError) {
        if (error instanceof TokenExpiredError) {
            return res.status(401).json({ error: 'Token expired' });
        } else {
            return res.status(401).json({ error: 'Invalid token' });
        }
    }

    // Handle other custom errors if needed
    if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
    }

    // Fallback to generic error handling
    return res.status(500).json({ error: 'Internal server error' });
};

export default errorHandler;
