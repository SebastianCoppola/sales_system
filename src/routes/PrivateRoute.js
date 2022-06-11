import { Navigate, Outlet, useLocation} from 'react-router-dom';
import useAuth from '../auth/useAuth';

export default function PrivateRoute() {
    const auth = useAuth();
    const location = useLocation();

    return (
        <>
            {
                auth.isLogged()
                ? 
                <Outlet />
                : 
                <Navigate to='/login' /> 
            }
        </>     
    )
}