import React, { useContext, useEffect, useState } from 'react'
import { CartContextProvider } from '../Context/CartContext';
import axios from 'axios';

export default function Cart() {
  const {products , setProducts , count , setCount} = useContext(CartContextProvider);
  const [productPrint , setProductPrint] = useState([]);
  useEffect(()=>{
    getAllProducts();
    window.localStorage.setItem("count" , count);
  },[products])

  function getAllProducts(){
    setProductPrint([]);
    products.forEach(element => {
      axioosData(element.id , element.quantity)
    });
  }

  async function axioosData(id , quantity){
    let {data} = await axios.get(`https://fakestoreapi.com/products/${id}`);
    data.quantity = quantity;
    
    setProductPrint((prevProducts) => {
      const isProductExist = prevProducts.some((p) => p.id === data.id);
      return isProductExist ? prevProducts : [...prevProducts, data];
    });
  }

  function decrease(id){
    let item = products.map(el=> (el.id == id) ? { ...el , quantity: el.quantity - 1} : el)
    setProducts(item);
    window.localStorage.setItem("cart" , JSON.stringify(item))
  }
  
  function increase(id){
    let item = products.map(el=> (el.id == id) ? { ...el , quantity: el.quantity + 1} : el)
    setProducts(item);
    window.localStorage.setItem("cart" , JSON.stringify(item))
  }

  function removeItem(id){
    let items = products.filter(el=>el.id != id);
    setProducts(items);
    setCount(count - 1);
    window.localStorage.setItem("cart" , JSON.stringify(items))
  }

  return (
    <div className='container my-5'>
      {productPrint ? productPrint.map(el=><div className='border gap-3 d-flex align-items-center mb-3 p-4' key={el.id}>
          <div  className='w-25'>
            <img src={el.image} alt="" />
          </div>
          <div className='w-75'>
            <h2>{el.title}</h2>
            <h2 className='text-secondary'>${el.price * el.quantity}</h2>
            <section className='text-dark'>{el.category}</section>
            <section className='mb-2'>
              {el.description}
            </section>
            <button onClick={()=>decrease(el.id)} className='btn btn-danger'>-</button>
            <span className='mx-2'>{el.quantity}</span>
            <button onClick={()=>increase(el.id)} className='btn btn-success'>+</button>
            <br />
            <div className='text-end'>
              <button onClick={()=>removeItem(el.id)} className='btn btn-danger mt-2'>Remove</button>
            </div>          
          </div>
      </div>):""}
    </div>
  )
}
