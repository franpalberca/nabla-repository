import express, {Express, Response, NextFunction} from 'express';
import cors from 'cors';
import morgan from 'morgan';
import errorHandler from './middleware/errorHandler';
import userRoutes from './routes/user.routes';
import fileUpload from 'express-fileupload';
import { checkJwtMiddleware } from './middleware/checkjwt.middleware';
import { AuthenticatedRequest } from './types/types';

const APP_ORIGIN = process.env.APP_ORIGIN || 'http://localhost:5173';
const app: Express = express();

const corsOptions = {
	origin: APP_ORIGIN,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));
app.use(errorHandler);
app.use('/user', userRoutes);
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: '/uploads',
	})
);
const addUserToRequest = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
	if (req.auth?.payload && typeof req.auth.payload.email === 'string') {
		req.user = {email: req.auth.payload.email};
	}
	next();
};
app.use(checkJwtMiddleware);
app.use(addUserToRequest);

export default app;
