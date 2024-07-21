// src/components/Cart.jsx
import React, { useContext, useState } from 'react';
import { CartContext } from '../../CartContext';
import { db } from '../../firebase'; // Import the Firebase database
import { addDoc, collection } from 'firebase/firestore'; // Import Firestore functions
import './Cart.css';

const Cart = () => {
  const { cartItems, updateCartItemQuantity, removeFromCart, clearCart } = useContext(CartContext);
  const [hasDesign, setHasDesign] = useState(true);
  const [file, setFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleQuantityChange = (productId, quantity) => {
    if (quantity > 0) {
      updateCartItemQuantity(productId, quantity);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      setSuccessMessage('Your cart is empty.');
      return;
    }

    const order = {
      customerDetails: {
        name,
        phone,
        address
      },
      items: cartItems,
      design: hasDesign && file ? file.name : null,
      timestamp: new Date(),
    };

    try {
      await addDoc(collection(db, 'orders'), order);
      setSuccessMessage('Order submitted successfully!');
      clearCart();
    } catch (error) {
      console.error('Error submitting order: ', error);
      setSuccessMessage('Failed to submit order. Please try again.');
    }
  };

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>
                <img src={item.image} alt={item.title} />
                <div>
                  <h3>{item.name}</h3>
                  <p>Price: ${item.price}</p>
                  <p>
                    Quantity:
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                      min="1"
                    />
                  </p>
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <button onClick={clearCart}>Clear Cart</button>
        </div>
      )}

      <div className="design-upload-form">
        <form onSubmit={handleSubmit}>
          <h2>Upload Your Design</h2>
          <div>
            <label>
              Do you have a design?
              <input
                type="checkbox"
                checked={hasDesign}
                onChange={(e) => setHasDesign(e.target.checked)}
              />
            </label>
          </div>
          {hasDesign && (
            <div>
              <label>Upload your design (Formats: CDR, PNG, JPG, JPEG):</label>
              <input
                type="file"
                accept=".cdr,.png,.jpg,.jpeg"
                onChange={handleFileChange}
                required
              />
            </div>
          )}
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Phone Number:</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
};

export default Cart;