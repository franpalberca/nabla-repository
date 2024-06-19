import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {useAuth0} from '@auth0/auth0-react';
import {HOME, LANDING, USER} from '../config/routes/paths';
import {HomePage, LandingPage, UserPage} from '../pages';
import { PrivateRoute, PublicRoute } from '../components/router';

export const Router = () => {
	const {user} = useAuth0();
	return (
		<BrowserRouter>
			<Routes>
				<Route path={LANDING} element={<PublicRoute />}>
					<Route index element={<LandingPage />} />
				</Route>
				<Route path={HOME} element={<PrivateRoute />}>
					<Route index element={<HomePage />}></Route>
					<Route path={USER} element={<UserPage />}></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
};
