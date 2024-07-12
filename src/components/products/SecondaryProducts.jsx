import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './SecondaryProducts.css';  // Import the CSS file
import secondaryProducts from './secondaryProduct';

const SecondaryProducts = () => {
  const { productName } = useParams();
  const products = secondaryProducts[productName] || [];

  return (
    <div className='secondary-product'>
      <h1>Secondary Products for {productName}</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <img src={product.image} alt="" />
            
            <Link to={`/products/${productName}/${product.id}`}>{product.name}</Link>
            <Link to="/"> <button>Back home</button></Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SecondaryProducts;