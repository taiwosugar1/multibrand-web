import React from 'react';
import { Link, useParams } from 'react-router-dom';
import secondaryProducts from './secondaryProduct.js';


const SingleProduct = ({ addToCart }) => {
  const { productName, productId } = useParams();
  const products = secondaryProducts[productName] || [];
  const product = products.find((p) => p.id === parseInt(productId, 10));

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="single-product">
      <h1>{productName} - {product?.name}</h1>
      {product ? (
        <div>
          <p>Product ID: {product.id}</p>
          <p>Product Name: {product.name}</p>
          <p>Product Description: {product.description}</p>
          <img src={product.image} alt="" />
          {/* Add more product details here */}
          <button onClick={handleAddToCart}>Add to Cart</button>
          
        </div>
        
      ) : (
        <p>Product not found</p>
      )}
      <Link to="/cart"><button>View Cart</button></Link>
    </div>
  );
};

export default SingleProduct;