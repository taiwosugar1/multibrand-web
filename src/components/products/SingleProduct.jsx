import React from 'react';
import { useParams } from 'react-router-dom';
import ProductArray from './ProductArray.js';
import "./SingleProduct.css"


const SingleProduct = () => {
  const { productName, productId } = useParams();
  const products = ProductArray[productName] || [];
  const product = products.find((p) => p.id === parseInt(productId, 10));

  

  
  return (
    <div className="single-product">
      <h1>{product?.name}</h1>
      {product ? (
        <div className='single-product-box'>
          <img src={product.image} alt="" />
          <p className='quantity'>MIN: {product.quantity} Units(s)</p>
          <div>
          <p>Product Name: </p><h3>{product.name}</h3>
          <p>Product Price: <h4>{product.price}</h4></p>
          <h4>Product Description:</h4>
          <p>{product.description}</p>
          
          </div>
        </div>
        
      ) : (
        <p>Product not found</p>
      )}
     
    </div>
  );
};

export default SingleProduct;