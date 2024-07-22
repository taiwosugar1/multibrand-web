// src/components/CategoryList.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import './AdminCategoryList.css';

const CategoryList = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryCollection = collection(db, 'categories');
        const categorySnapshot = await getDocs(categoryCollection);
        setCategories(categorySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className='category-list'>
      <h2>Categories</h2>
      <div className='category-buttons'>
        {categories.map(category => (
          <button key={category.id} onClick={() => handleCategoryClick(category.id)}>
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;