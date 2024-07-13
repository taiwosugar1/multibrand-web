import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductArray from './ProductArray.js';
import "./SingleProduct.css"


const SingleProduct = ({ addToCart }) => {
  const { productName, productId } = useParams();
  const products = ProductArray[productName] || [];
  const product = products.find((p) => p.id === parseInt(productId, 10));

  const handleAddToCart = () => {
    addToCart(product);
  };

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
          
          
          {/* Add more product details here */}
          <div className='add-to-cart-button'>
          <button onClick={handleAddToCart}>Add to Cart</button>
          <Link to="/cart"><button className='add-to-cart-button'>View Cart</button></Link>
          </div>
          </div>
        </div>
        
      ) : (
        <p>Product not found</p>
      )}
     
    </div>
  );
};

export default SingleProduct;