// import React from 'react'
import {  NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
    const { ...user } = useAuth()

  return (
    <>
        <nav>
            <div>
                {/* <Link to='/'>Home</Link> */}
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about">About</NavLink>
                    </li>
                    <li>
                        <NavLink to="/login">Login</NavLink>
                    </li>
                    {user.isLoggedIn && (
                        <>
                            <li>
                                <NavLink to="/dashboard">Dashboard</NavLink>
                            </li>
                            <li>
                                <NavLink to="/profile">Profile</NavLink>
                            </li>
                        </>
                    )}
                    {user.isLoggedIn && user.role === "admin" && (  
                    <li>
                        <NavLink to="/admin">Admin</NavLink>
                    </li>
                    )}
                </ul>
            </div>
        </nav>
    </>
  )
}

export default Navbar
