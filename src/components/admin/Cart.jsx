// src/components/Cart.jsx
import React, { useContext } from 'react';
import './Cart.css';
import { CartContext } from '../../CartContext';

const Cart = () => {
  const { cartItems, updateCartItemQuantity, removeFromCart, clearCart } = useContext(CartContext);

  const handleQuantityChange = (productId, quantity) => {
    if (quantity > 0) {
      updateCartItemQuantity(productId, quantity);
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
    </div>
  );
};

export default Cart;