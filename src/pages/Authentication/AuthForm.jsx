import { useEffect } from "react";
import React from "react";
import Login from "../../components/Auth/LoginForm";
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


const AuthForm = () => {
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('userRoles')
    return(
        <>
            <Login/>
        </>
    )
}

export default AuthForm;