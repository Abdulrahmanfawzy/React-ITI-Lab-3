import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { CartContextProvider } from '../Context/CartContext';
import { notify } from '../Toastify/Toastify';

export default function ProductDetails() {
    const {id} = useParams();
    const [product , setProduct] = useState({});
    const {products , setProducts , setCount , count} = useContext(CartContextProvider);
    
    useEffect(()=>{
        window.localStorage.setItem("cart" , JSON.stringify(products));
        window.localStorage.setItem("count" , count);
    },[products])

    useEffect(()=>{
        getSingleProduct();
    },[])


    async function getSingleProduct(){
        try{
            const {data} = await axios.get(`https://fakestoreapi.com/products/${id}`)
            setProduct(data);
        }
        catch(err){
            console.log(err);
            
        }
    }

    
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
    <>
         <div className='row align-items-center my-5'>
            <div className="col-md-6">
                <img className='w-100' src={product.image} alt={product.title} />
            </div>
            <div className="col-md-6">
                <h3 className='my-2'>{product.title}</h3>
                <h2>${product.price}🔥</h2>
                <section className='my-3'>{product.description}</section>
                <section>category: <strong>{product.category}</strong></section>
                <div className="my-4">
                    <button onClick={()=>addToCart(product.id)} className='btn w-50 btn-success'>
                        Cart
                    </button>
                </div>
            </div>
        </div>
    </>
  )
}
