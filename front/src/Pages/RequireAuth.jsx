import React from 'react'
import { useSelector } from 'react-redux';
import {Navigate, Outlet, useLocation} from 'react-router-dom'

export function RequireAuth({allowedRoles}) {
    const { isloggedIn,role } =useSelector((state)=>state.auth);
    console.log(isloggedIn);
    console.log(role)

    return isloggedIn && allowedRoles.find((myRole)=>myRole === role) ? (
        <Outlet/>
    ) : isloggedIn ? ( <Navigate to="/denied"/>) :(<Navigate to='/login'/>)
}
