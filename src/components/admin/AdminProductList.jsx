// src/components/ProductList.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import './AdminProductList.css';
import { FaArrowRight } from 'react-icons/fa';



const ProductList = () => {
 
  const [Products, setProducts] = useState([]);
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productCollection = collection(db, 'products');
        const productSnapshot = await getDocs(productCollection);
        const productsList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        setProducts(productsList); // Initialize with all products
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);



  
  return (
    <div className='product-list'>
      
      <h1>Our Products</h1>
      <div className='product-container'>
        {Products.map((product) => (
          <div key={product.id} className='product-box'>
            <img src={product.imageUrl} alt="" />
            <h3>{product.name}</h3>
            <h3>As low as ₦{product.price}</h3>
            <Link to={`/product/${product.id}`}>
              <button className='view-More-sec-button'>
              <FaArrowRight />
              </button>
            </Link>
            <Link to={'/category'}>
              <button className='view-More-sec-button'>
                <FaArrowRight />
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;