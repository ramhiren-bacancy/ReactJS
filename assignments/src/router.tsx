import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";
import Admin from "./pages/Admin";
import Unauthorized from "./pages/Unauthorized";
import './App.css'

export const router =createBrowserRouter([
    {
        path : '/',
        element : <Layout/>,
        // errorElement: <Error/>, //render if layout or child throw error
        children :[
            {index:true ,element:<Home/>}, // default 
            {path:"about",element:<About/>},
            {path:"login",element:<Login/>},
            {
                element:<ProtectedRoute/>,
                children:[
                    {path:"dashboard", element:<Dashboard/>},
                    {path: "profile", element:<Profile/>},  
                    {
                        element: <RoleRoute allowedRoles={["admin"]}/>,
                        children : [
                            {path: "admin" , element: <Admin/>}
                        ]
                    }
                ]
            },
            {path:"unauthorized", element:<Unauthorized/>}
        ]
    },
    { path: "*", element: <NotFound /> },
])