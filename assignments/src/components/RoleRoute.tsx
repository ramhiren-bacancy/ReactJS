import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type Role = "admin" | "user" 

// import React from 'react'
type Props = {
  allowedRoles: Role[];
};

const RoleRoute = ({allowedRoles}: Props) => {
    const { ...user } = useAuth();
    const location = useLocation();

    if(!allowedRoles.includes(user.role)){
        alert("You are not authorized to access this page");
        return <Navigate to="/unauthorized" state={{from: location}} replace />;
    }
  return <Outlet/>
}

export default RoleRoute
