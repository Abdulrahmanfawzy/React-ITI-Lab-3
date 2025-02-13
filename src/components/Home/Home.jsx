import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination';

export default function Home() {
  const [allProducts, setAllProducts] = useState([]); // بيانات جميع المنتجات
  const [products, setProducts] = useState([]); // المنتجات المعروضة بناءً على الصفحة الحالية
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // عدد المنتجات في كل صفحة

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    paginateData(allProducts, currentPage); // عندما تتغير الصفحة، يتم تصفية المنتجات بناءً على الصفحة الجديدة
  }, [currentPage, allProducts]);

  async function getProducts() {
    try {
      let { data } = await axios.get(`https://fakestoreapi.com/products`);
      setAllProducts(data); // حفظ جميع البيانات في الحالة
      paginateData(data, 1); // تصفية البيانات وعرض المنتجات الخاصة بالصفحة الأولى
    } catch (err) {
      console.log(err);
    }
  }

  // تجزئة البيانات حسب الصفحة الحالية
  const paginateData = (allProducts, page) => {
    const indexOfLastProduct = page * itemsPerPage; // أخر منتج في الصفحة
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage; // أول منتج في الصفحة
    const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct); // المنتجات الحالية
    setProducts(currentProducts); // تحديث المنتجات المعروضة في الصفحة
  };

  // تغيير الصفحة
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber); // تحديث الصفحة الحالية
  };

  return (
    <div className="container my-5">
      <div className="row">
        {products?.map(product => (
          <Card product={product} key={product.id} />
        ))}
      </div>
      <div className="mx-auto position-absolute bottom-0 start-50 translate-middle-x">
        <Pagination 
          totalItems={allProducts.length} // اجمالي عدد المنتجات
          itemsPerPage={itemsPerPage} 
          paginate={paginate} 
          currentPage={currentPage} 
        />
      </div>
    </div>
  );
}
