import React from 'react';
import './Cart.css';  // Import the CSS file

const Cart = ({ cartItems, updateCartItemQuantity, removeFromCart }) => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Uploaded file:', file);
      // Handle the uploaded file here
    }
  };

  return (
    <div className="cart">
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p >Your cart is empty</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <div className="cart-item">
                <p>{item.name}</p>
                <div className="quantity-controls">
                  <img src={item.image} alt="" />
                  <button onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}  className='cart-button'>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)} className='cart-button'>+</button>
                </div>
                <button onClick={() => removeFromCart(item.id)}  className='cart-button'>Remove</button>
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
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};

export default Cart;