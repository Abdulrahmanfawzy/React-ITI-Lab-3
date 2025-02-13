import React, { createContext, useEffect, useState } from 'react'


export const CartContextProvider = createContext();

export default function CartContext({children}) {
    const [products , setProducts] = useState([]);
    const [count , setCount] = useState(0);

    useEffect(()=>{
        if(window.localStorage.getItem("cart")){
            setProducts(JSON.parse(window.localStorage.getItem("cart")));
        }
        if(window.localStorage.getItem("count")){
            setCount(window.localStorage.getItem("count"));
        }
    },[])
  return (
    <CartContextProvider.Provider value={{products,setProducts , count , setCount}}>
        {children}
    </CartContextProvider.Provider>
  )
}
