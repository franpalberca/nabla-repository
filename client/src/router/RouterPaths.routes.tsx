import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {ADMIN, HOME, LANDING, LOGIN, SIGNUP, UNAUTHORIZED, USERPAGE} from '../config/routes/paths';
import {HomePage, LandingPage, UserPage, LoginPage, SignUpPage, UnauthorizedPage} from '../pages';
import { PrivateRoute, PublicRoute } from '../components/router';
import { AdminPage } from '../pages/AdminPage';
import { ProtectedAdminRoute } from '../components/router/AdminRoute';

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
                <Route path={ADMIN} element={<ProtectedAdminRoute><AdminPage /></ProtectedAdminRoute>} />
                <Route path={UNAUTHORIZED} element={<UnauthorizedPage />} />
			</Routes>
		</BrowserRouter>
	);
};
