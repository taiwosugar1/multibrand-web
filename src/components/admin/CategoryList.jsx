// src/components/ProductList.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import './ProductList.css';
import { FaArrowRight } from 'react-icons/fa';
import CategoryList from './CategoryList';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productCollection = collection(db, 'products');
        const productSnapshot = await getDocs(productCollection);
        const productsList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsList);
        setFilteredProducts(productsList); // Initialize with all products
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const fetchProductsByCategory = async () => {
        try {
          const productCollection = collection(db, 'products');
          const q = query(productCollection, where('categoryId', '==', selectedCategory));
          const productSnapshot = await getDocs(q);
          setFilteredProducts(productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (err) {
          console.error('Error fetching products by category:', err);
        }
      };

      fetchProductsByCategory();
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory, products]);

  return (
    <div className='product-list'>
      <CategoryList onSelectCategory={setSelectedCategory} />
      <h1>Our Products</h1>
      <div className='product-container'>
        {filteredProducts.map((product) => (
          <div key={product.id} className='product-box'>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <h3>As low as ₦{product.price}</h3>
            <Link to={`/product/${product.id}`}>
              <button className='view-More-sec-button'>
                <p><FaArrowRight /></p>
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;