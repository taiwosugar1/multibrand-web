import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './AdminCategoryPage.css';

const CategoryPage = () => {
  const { categoryName } = useParams(); // Change to categoryName to match the URL param
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'products');
        const q = query(productsCollection, where('categoryName', '==', categoryName));
        const productsSnapshot = await getDocs(q);
        setProducts(productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, [categoryName]);

  return (
    <div className='category-page'>
      <h2>Products in Category: {categoryName}</h2>
      <div className='products-list'>
        {products.map(product => (
          <div key={product.id} className='product-item'>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <img src={product.imageUrl} alt={product.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;