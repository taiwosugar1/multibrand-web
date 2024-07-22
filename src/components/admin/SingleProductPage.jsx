// src/pages/SingleProductPage.jsx
import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { CartContext } from '../../CartContext';
import './SingleProductPage.css';

const SingleProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      const productDoc = doc(db, 'products', productId);
      const productSnapshot = await getDoc(productDoc);
      if (productSnapshot.exists()) {
        setProduct({ id: productSnapshot.id, ...productSnapshot.data() });
      } else {
        console.error('Product not found');
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (    
      <div className="single-product">
      <h1>{product?.name}</h1>
      {product ? (
        <div className='single-product-box'>
          <img src={product.imageUrl} alt="" />
          <p className='quantity'>MIN: {product.quantity} Units(s)</p>
          <div>
          <p>Product Name: </p><h3>{product.name}</h3>
          <p>Product Price: <h4>{product.price}</h4></p>
          <h4>Product Description:</h4>
          <p>{product.description}</p>
          <p>Timestamp: {new Date(product.timestamp.seconds * 1000).toLocaleString()}</p>

          <div className="cart-button">
             <button onClick={() => addToCart(product)} className='add-to-cart-button'>Add to Cart</button>

             <Link to="/cart"><button        className='add-to-cart-button'>View Cart</button></Link>
         </div>
          
          
          {/* Add more product details here */}
          
          </div>
        </div>
        
      ) : (
        <p>Product not found</p>
      )}
     
    </div>
  );
};

export default SingleProductPage;