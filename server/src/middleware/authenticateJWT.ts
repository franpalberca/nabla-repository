import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';
import {AuthenticatedRequest} from '../types/types';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
	const token = req.header('Authorization')?.split(' ')[1];

	if (!token) {
		return res.status(401).send({error: 'No token provided'});
	}

	jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
		if (err) {
			return res.status(403).send({error: 'Failed to authenticate token'});
		}

		(req as AuthenticatedRequest).user = user as {email: string};
		next();
	});
};
