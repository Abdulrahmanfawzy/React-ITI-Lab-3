import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styles from "./category.module.css";
import { NavLink, Outlet } from 'react-router-dom';

export default function Category() {

  const [categories , setCategories] = useState([]);

  useEffect(()=>{
    getAllCategories();
  } , [])
  
  async function getAllCategories(){
    const {data} = await axios.get(`https://fakestoreapi.com/products/categories`);
    setCategories(data);
  }

  return (
    <div className='row gap-2 mt-5'>
      {categories?.map((category,index)=>
      
      <NavLink to={category} className={`col text-decoration-none text-dark py-3 p-2 border text-center ${styles.category}`} key={index}>{category}</NavLink>
      )}

      <Outlet></Outlet>
    </div>
  ) 
}
