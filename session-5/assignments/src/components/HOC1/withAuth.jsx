
// Higher Order Function

import { Navigate } from "react-router-dom"


function withAuth(WrappedComponent) {
    return function AuthProtected(){
        const isLoggedIn = Boolean(localStorage.getItem("token"))

        if(!isLoggedIn){
            return <Navigate to="/login"/>
        }
        return <WrappedComponent />
    }
}  


export default withAuth