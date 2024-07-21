import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import './AdminCategory.css';

const Category = () => {
  const [category, setCategory] = useState([])
  useEffect(() => {
    const fetchCategory = async () => {
      const productCollection = collection(db, 'products');
      const productSnapshot = await getDocs(productCollection);
      setCategory(productSnapshot.docs.map(doc => ({ category: doc.category, ...doc.data() })));
    };

    fetchCategory();
  }, []);

  return (
    <div className='product-cayegory'>
      <h1>{category.replace('_', ' ')}</h1>
      <ul>
        {category.map(product => (
          <li key={product.id}>
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;