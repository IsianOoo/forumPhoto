import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';


export default function PrivateRoute({children}){
    const {user,loading} = useContext(UserContext)

    if(loading){
        return null
    }

    if(!user){
        return <Navigate to="/" />
    }

    return children
}