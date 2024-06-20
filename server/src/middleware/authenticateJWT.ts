import jwt from 'jsonwebtoken';
import {Response, NextFunction} from 'express';
import {AuthenticatedRequest} from '../types/types';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
	throw new Error('JWT_SECRET is not defined');
}

export const authenticateJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	console.log(token);
	if (!token) {
		return res.status(403).send({error: 'No token provided'});
	}

	try {
		jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
			if (err) {
				return res.status(401).send({error: 'Failed to authenticate token'});
			}

			next();
		});
	} catch (err) {
		console.error(err);
		return res.status(403).send({error: 'Failed to authenticate token'});
	}
};
