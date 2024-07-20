// src/components/products/Cart.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import './Cart.css';

const Cart = ({ cartItems, updateCartItemQuantity, removeFromCart, clearCart }) => {
  const navigate = useNavigate();
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({ ...customerDetails, [name]: value });
  };

  const handleOrder = async () => {
    if (!customerDetails.name || !customerDetails.phone || !customerDetails.address) {
      alert('Please provide all required details');
      return;
    }

    try {
      await addDoc(collection(db, 'orders'), {
        items: cartItems,
        customerDetails,
        timestamp: new Date(),
      });
      clearCart();
      alert('Order placed successfully!');
      navigate('/'); // Navigate to home page or another page after order
    } catch (error) {
      console.error('Error placing order: ', error);
      alert('Failed to place order');
    }
  };

  if (cartItems.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="cart">
      <h2>Cart</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id} className="cart-item">
            <p>Name: {item.name}</p>
            <p>Price: ${item.price}</p>
            <p>Quantity: 
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => updateCartItemQuantity(item.id, parseInt(e.target.value))}
                min="1"
              />
            </p>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h3>Customer Details</h3>
      <form>
        <label>
          Name:
          <input type="text" name="name" value={customerDetails.name} onChange={handleInputChange} required />
        </label>
        <label>
          Phone:
          <input type="text" name="phone" value={customerDetails.phone} onChange={handleInputChange} required />
        </label>
        <label>
          Address:
          <input type="text" name="address" value={customerDetails.address} onChange={handleInputChange} required />
        </label>
      </form>
      <button onClick={handleOrder}>Place Order</button>
    </div>
  );
};

export default Cart;