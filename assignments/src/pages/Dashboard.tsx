// import React from 'react'

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";


const Dashboard = () => {
    const { login, logout,...user } = useAuth();

//      useEffect(() => {
//     if (!user.isLoggedIn) {
//       alert("Please login to access the dashboard");
//     }
//   }, [user.isLoggedIn]);

//   if (!user.isLoggedIn) {
//     return <Navigate to="/login" replace />;
//   }

  return (
    <>
        <div>
            <h1> DashBoard</h1>
          <h2>Welcome to Dashboard, {user.name}!</h2>
            <p>Your role: {user.role}</p>
            <button onClick={logout}>Logout</button>
        </div>
    </>
  )
}

export default Dashboard
