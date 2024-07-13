import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './SecondaryProducts.css';  
import ProductArray from './ProductArray';


const SecondaryProducts = () => {
  const { productName } = useParams();
  const products = ProductArray[productName] || [];

  return (
    <div className='secondary-product'>
      <br />
      <h1>List Of {productName}</h1>
      <hr />
      <div  className='secondary-product-container'>
        {products.map((product) => (
          <div key={product.id}  className='secondary-product-box'>
           
            <img src={product.image} alt="" />
            <h3>{product.name}</h3>
            <p>Delivery: <span>{product.delivery} working days</span></p>

            <Link></Link>
            
            <Link to={`/products/${productName}/${product.id}`}><p className='view-product-details'>View Details</p></Link>
            
        
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecondaryProducts;