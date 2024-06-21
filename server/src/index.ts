import express, {Express, Response, NextFunction} from 'express';
import cors from 'cors';
import morgan from 'morgan';
import errorHandler from './middleware/errorHandler';
import userRoutes from './routes/user.routes';
import {AuthenticatedRequest} from './types/types';
import bodyParser from 'body-parser';
import config from './config/config';
import baseRoute from './api/index';

const APP_ORIGIN = process.env.APP_ORIGIN || 'http://localhost:5173';
const app: Express = express();

const corsOptions = {
	origin: APP_ORIGIN,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(errorHandler);
app.use('/user', userRoutes);
const addUserToRequest = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
	if (req.auth?.payload && typeof req.auth.payload.email === 'string') {
		req.user = {email: req.auth.payload.email, userId: req.auth.payload.id};
	}
	next();
};
app.use(addUserToRequest);
app.use('/', baseRoute);

const PORT: string | number = config.app.PORT;

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});

export default app;
