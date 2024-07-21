// src/components/ProductList.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import './AdminProductList.css';
import { FaArrowRight } from 'react-icons/fa';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productCollection = collection(db, 'products');
      const productSnapshot = await getDocs(productCollection);
      setProducts(productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchProducts();
  }, []);

  return (
    <div className='product-list'>
    <h1>Our Products</h1>
    <div className='product-container'>
      {products.map((product) => (
        <div key={product.id} className='product-box'>
           <img src={product.image} alt="" />
           <h3>{product.name}</h3>
           <h3>As low as ₦{product.price}</h3>
           <Link to={`/product/${product.id}`}><button className='view-More-sec-button'><p><FaArrowRight/></p></button></Link>
         
        </div>
      ))}
    </div>
  </div>
  );
};

export default ProductList;