import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../db/clientPrisma';

interface JwtPayload {
	userId: string;
}

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
	throw new Error('JWT_SECRET is not defined');
}

export const authorizeAdmin = async (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.authorization?.split(' ')[1];

	if (!token) {
		return res.status(401).send({error: 'Unauthorized'});
	}

	try {
		const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
		const user = await prisma.user.findUnique({
			where: {userId: decoded.userId},
		});

		if (!user || !user.isAdmin) {
			return res.status(403).send({error: 'Forbidden'});
		}

		next();
	} catch (err) {
		console.error(err);
		return res.status(500).send({error: 'Internal server error'});
	}
};
