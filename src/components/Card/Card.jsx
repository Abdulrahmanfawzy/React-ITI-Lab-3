import React, { useContext, useEffect } from 'react';
import styles from "./card.module.css";
import { NavLink } from 'react-router-dom';
import { CartContextProvider } from '../Context/CartContext';
import { notify } from '../Toastify/Toastify';

export default function Card({product}) {
    
    const {products , setProducts , count , setCount} = useContext(CartContextProvider);

    useEffect(()=>{
        window.localStorage.setItem("cart" , JSON.stringify(products));
        window.localStorage.setItem("count" , count);
    },[products , count])

    function addToCart(id){
        setCount(count + 1)
        let product = products.find((el)=>el.id == id);
        if(product){
            setProducts((prevProducts) =>
                prevProducts.map((p) =>
                  p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
                )
              );
        }else{
            setProducts((prevProducts) => [...prevProducts, {id: id , quantity: 1}]);
        }
        notify("Added to cart" , "success");
        
    }

  return (
    <div className='col-md-3 text-center mb-2'>
        <div className="card p-2">
            <img className={`mb-3 ${styles.productImg}`} src={product.image} alt={product.title.split(" ").slice(0,2).join(" ")} />
            <h5 className='mb-0'>{product.title.split(" ").slice(0,3).join(" ")}</h5>
            <section>category: <strong>{product.category}</strong></section>
            <h5 className='text-secondary'>price: <strong className='text-dark'>${product.price}</strong></h5>
            <div className="d-flex justify-content-center gap-2 my-2">
                <button onClick={()=>addToCart(product.id)} className='btn w-50 btn-success'>
                    Cart
                </button>
                <button className='btn w-50 btn-outline-secondary'>
                    <NavLink className="text-dark text-decoration-none" to={`/details/${product.id}`}>View</NavLink>
                </button>
            </div>
        </div>
    </div>
  )
}
