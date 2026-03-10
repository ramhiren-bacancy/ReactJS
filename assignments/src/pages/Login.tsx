// import React from 'react'
import { useState } from "react";
import {  useAuth } from "../context/AuthContext";
import { Navigate, useNavigate,useLocation } from "react-router-dom";

// <Navigate> is  redirect other routes based on condition.
// useNavigate is used to programmatically navigate to other routes.

type Role = "user" | "admin";

const Login = () => {
      const { login, logout,...user } = useAuth();
      const [name, setName] = useState("");
      const [role, setRole] = useState<Role>("user");
      const navigate = useNavigate();
      const location = useLocation();
      const from = location.state?.from?.pathname || "/dashboard";
      const [loading,setLoading] = useState(false);

      if(user.isLoggedIn){
        return <Navigate to={from} replace />;
      }

      const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
      };

      const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRole(e.target.value as Role);
      };

      const handleSubmit = async() => {
        if(name == ""){
          alert("Please enter your name");
          return;
        }

        setLoading(true);
        await login(name, role);
        setLoading(false);

        console.log(from)
        navigate(from, { replace: true });
        setName("");
        setRole("user");
      }

  if(loading){  return <h2>Loading.....</h2>}
  return (
    <div>
      {user.isLoggedIn ? (
        <div>
          <h2>Welcome, {user.name}!</h2>    
          <p>Your role: {user.role}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <h2>Login</h2> 
          <label htmlFor="name">Enter Your name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={handleNameChange} 
          />
          <br></br>
          <br></br>
          <label htmlFor="role">Enter Your role</label>
          <select value={role} onChange={handleRoleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>  
          </select>
          <br></br>
          <br></br>
          <button onClick={handleSubmit}>Login</button>
        </div>
      )}
    </div>
  )
}

export default Login
