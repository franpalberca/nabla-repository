import {Request} from 'express';

export interface AuthenticatedRequest extends Request {
	user?: {
		email: string;
		userId: string;
	};
	auth?: {
		payload: {
			email: string;
			id: string;
		};
	};
}
