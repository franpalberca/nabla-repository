import { Navigate, Outlet } from 'react-router-dom';
import { HOME } from '../../config/routes/paths';
import { useContext } from 'react';
import { AuthContext } from '../../config/context/AuthContext';

export const PublicRoute = () => {
    const {user} = useContext(AuthContext);

    if (user) {
        return <Navigate to={HOME} />;
    }

    return (
        <div>
            <Outlet />
        </div>
    )

}