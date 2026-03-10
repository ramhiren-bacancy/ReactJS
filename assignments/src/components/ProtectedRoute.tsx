import { useAuth } from '../context/AuthContext'
import { Navigate, Outlet, useLocation } from 'react-router';

const ProtectedRoute = () => {
    const {...user} = useAuth()
    const location = useLocation();

    if(!user.isLoggedIn){
        alert("Please login to access the dashboard xxx");
        return <Navigate to="/login" state={{from: location}} replace />;
    }
  return <Outlet/>
}

export default ProtectedRoute
