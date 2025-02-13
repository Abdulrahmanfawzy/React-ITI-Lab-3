import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Card from '../Card/Card';

export default function Home() {

  const [products , setProducts] = useState([]);
  useEffect(()=>{
    getProducts();
  },[])

  async function getProducts(){
    try{
      let {data} = await axios.get(`https://fakestoreapi.com/products`);
      setProducts(data);      
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div className="container my-5">
      <div className="row">
        {products?.map(product=><Card product={product} key={product.id} />)}
      </div>
    </div>
  )
}
