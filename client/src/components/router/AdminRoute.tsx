import {useContext} from 'react';
import {Navigate} from 'react-router-dom';
import { AuthContext } from '../../config/context/AuthContext';

export const ProtectedAdminRoute = ({children}: {children: JSX.Element}) => {
	const {user} = useContext(AuthContext);

	if (user?.isAdmin) {
		return <Navigate to="/unauthorized" />;
	}

	return children;
};


