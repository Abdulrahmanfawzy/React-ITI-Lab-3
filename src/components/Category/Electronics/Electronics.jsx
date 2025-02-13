import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Card from '../../Card/Card';
import { useParams } from 'react-router-dom';

export default function Electronics() {
  const [category , setCategory] = useState([]);
  const [error , setError] = useState(false);
  const {categoryWord} = useParams();
  useEffect(()=>{
    getCategory()
  },[categoryWord])

  async function getCategory(){
    try{
      const {data} = await axios.get(`https://fakestoreapi.com/products/category/${categoryWord}`);
      console.log(data);
      if(data.length > 0){
        setError(false)
        setCategory(data);
      }else{
        setError(true)
      }
    }
    catch(err){
      console.log(err);
    }
  }

  if(error){
    return <h2 className='mt-5 text-center text-capitalize'>
      this category is not found
    </h2>
  }

  return (
    
    <div className='row'>
        {category?.map(product=><Card product={product} key={product.id} />)}
    </div>
  )
}
