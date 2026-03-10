// import React from 'react'

import { useAuth } from "../context/AuthContext";

const Admin = () => {
  const { logout,...user } = useAuth();
  return (
    <>
      <h1>This is Admin page </h1>
      <h2>Welcome to Admin page, {user.name}</h2>
      <p>Your role: {user.role}</p>
      <button onClick={logout}>Logout</button>
    </>
  )
}

export default Admin
