import React, { useState } from 'react';
import './Cart.css';
import { Link } from 'react-router-dom';

const Cart = ({ cartItems, updateCartItemQuantity, removeFromCart }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Uploaded file:', file);
      // Create a URL for the file to display it
      const fileUrl = URL.createObjectURL(file);
      setUploadedFile(fileUrl);
      setFileName(file.name);
    }
  };

  return (
    <div className="cart">
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <div className="cart-item">
                <p>{item.name}</p>
                <div className="quantity-controls">
                  <img src={item.image} alt={item.name} />
                  <button onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)} className='cart-button'>-</button>
                  <h3>{item.quantity}</h3>
                  <button onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)} className='cart-button'>+</button>
                </div>
                <button onClick={() => removeFromCart(item.id)} className='cart-button'>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="upload-container">
        <label htmlFor="file-upload" className="custom-file-upload">
          Upload Your Design
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".jpeg,.cdr,.png,.jpg"
          onChange={handleFileUpload}
        />
        {uploadedFile && <img src={uploadedFile} alt="Uploaded Design" className="uploaded-file" />}
        {fileName && <p className="file-name">{fileName}</p>}
        <Link to="https://wa.me/2348029299901"><button className='confirm-print-button'>Confirm to Print</button></Link>
        <Link to="/product-list"><button className='cart-return-button'>Back to Product</button></Link>
      </div>
    </div>
  );
};

export default Cart;