import React from 'react';
import { useParams } from 'react-router-dom';

import './Category.css';
import ProductArray from '../products/ProductArray';

const Category = () => {
  const { category } = useParams();
  const products = ProductArray[category];

  if (!products) {
    return <h1>Category not found</h1>;
  }

  return (
    <div className='product-cayegory'>
      <h1>{category.replace('_', ' ')}</h1>
      <ul>
        {products.map(product => (
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