import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './SecondaryProducts.css';  
import ProductArray from './ProductArray';

const SecondaryProducts = () => {
  const { productName } = useParams();
  const products = ProductArray[productName] || [];

  return (
    <div className='secondary-product'>
      <h1>List Of {productName}</h1>
      <div  className='secondary-product-container'>
        {products.map((product) => (
          <div key={product.id}  className='secondary-product-box'>
           
            <img src={product.image} alt="" />
            <h3>{product.name}</h3>
            
            <Link to={`/products/${productName}/${product.id}`}><p>View Details</p></Link>
        
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecondaryProducts;