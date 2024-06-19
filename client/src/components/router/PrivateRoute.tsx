import {Navigate, Outlet} from 'react-router-dom';
import {LANDING} from '../../config/routes/paths';
import { useContext } from 'react';
import { AuthContext } from '../../config/context/AuthContext';

export const PrivateRoute = () => {
	const {user} = useContext(AuthContext);

	return (
		<>
			{user ? (
				<div>
					<Outlet />
				</div>
			) : (
				<Navigate to={LANDING} />
			)}
		</>
	);
};
