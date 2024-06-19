import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';
import {AuthenticatedRequest} from '../types/types';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
	const token = req.header('Authorization')?.split(' ')[1];

	if (!token) {
		return res.status(401).send({error: 'No token provided'});
	}

	try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as { email: string; id: string };

    // Assign user to the request
    (req as AuthenticatedRequest).user = { email: decodedToken.email, id: decodedToken.id };

    next();
} catch (err) {
    console.error(err);
    return res.status(403).send({ error: 'Failed to authenticate token' });
}
};
