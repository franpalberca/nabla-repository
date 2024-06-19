import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {HOME, LANDING, LOGIN, SIGNUP, USERPAGE} from '../config/routes/paths';
import {HomePage, LandingPage, UserPage, LoginPage, SignUpPage} from '../pages';
import { PrivateRoute, PublicRoute } from '../components/router';

export const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={LANDING} element={<PublicRoute />}>
					<Route index element={<LandingPage />} />
					<Route path={LOGIN} element={<LoginPage />} />
					<Route path={SIGNUP} element={<SignUpPage />} />
				</Route>
				<Route path={HOME} element={<PrivateRoute />}>
					<Route index element={<HomePage />}></Route>
					<Route path={USERPAGE} element={<UserPage />}></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
};
