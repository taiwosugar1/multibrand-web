import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import './AdminProductList.css';


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  // List of all predefined categories
  const predefinedCategories = ['Books', 'Bags', 'Letterhead', 'Branding', 'Clothes', 'Fliers', 'Company Branding'];

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

    const fetchCategories = async () => {
      try {
        const categoryCollection = collection(db, 'categories');
        const categorySnapshot = await getDocs(categoryCollection);
        const fetchedCategories = categorySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Merge predefined categories with fetched categories, avoiding duplicates
        const allCategories = [...new Set([...predefinedCategories, ...fetchedCategories.map(c => c.name)])];
        setCategories(allCategories.map(name => ({ id: name, name }))); // Normalize to an array of objects
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const handleCategoryChange = async (e) => {
    const categoryName = e.target.value;
    setSelectedCategory(categoryName);

    try {
      const productCollection = collection(db, 'products');
      let productSnapshot;

      if (categoryName) {
        const q = query(productCollection, where('categoryName', '==', categoryName));
        productSnapshot = await getDocs(q);
      } else {
        productSnapshot = await getDocs(productCollection);
      }

      const productsList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsList);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${categoryName}`);
  };

  return (
    <div className='product-list'>
      <h1>Our Products</h1>
      <div>
        <label>Filter by Category: </label>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value=''>All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>{category.name}</option>
          ))}
        </select>
      </div>
      <div className='product-container'>
        {products.map((product) => (
          <div key={product.id} className='product-box'>
             <Link to={`/product/${product.id}`}>
            <img src={product.imageUrl} alt={product.name} />
            </Link>
            <h3>{product.name}</h3>
            <h3>As low as ₦{product.price}</h3>
 
            <button 
              className='explore-more-button' 
              onClick={() => handleCategoryClick(product.categoryName)}
            >Explore More</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
