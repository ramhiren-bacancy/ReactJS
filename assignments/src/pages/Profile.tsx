import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const Profile = () => {
     const { login, logout,...user } = useAuth();
    //  const location = useLocation();

//      useEffect(() => {
//     if (!user.isLoggedIn) {
//       alert("Please login to access the dashboard");
//     }
//   }, [user.isLoggedIn]);

//   if (!user.isLoggedIn) {
//     return <Navigate to="/login" state={{from: location}} replace />;
//   }

  return (
    <div>
      <h1>Your Profile Page</h1>
      <p>Welcome, {user.name}!</p>
      <p>Your role: {user.role}</p>
    </div>
  )
}

export default Profile
