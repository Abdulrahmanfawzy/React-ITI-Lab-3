import React, { createContext, useEffect, useState } from 'react'

export const TokenContext = createContext();

export default function tokenContext({children}) {
    const [token , setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        checkToken();
    },[token])
    

    function checkToken(){
        let tokenLocal = window.localStorage.getItem("token");
        if(tokenLocal){
            setToken(tokenLocal);
        }else{
            setToken(null);
        }
        setLoading(false);
    }


  return (
    <TokenContext.Provider value={{token , setToken , loading}}>
        {children}
    </TokenContext.Provider>
  )
}
