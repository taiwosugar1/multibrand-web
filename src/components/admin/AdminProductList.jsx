// src/components/ProductList.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import './AdminProductList.css';

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
    <div className="product-list">
      <h2>Product List</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`}>
            <img src={product.image} alt={product.title} />
              <p>Name: {product.name}</p>
              <p>Price: ${product.price}</p>
              <p>Description: {product.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;