import React, { useContext, useEffect } from 'react'
import { TokenContext } from '../Context/tokenContext'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({children}) {
    const {token , loading} = useContext(TokenContext);
    useEffect(()=>{
        // console.log(token);
    },[token])
    
    if(loading){
        return <h2>loading....</h2>
    }

    return token ? children : <Navigate to="/login" />;

}
