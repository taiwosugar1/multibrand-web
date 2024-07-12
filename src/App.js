import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/products/ProductList';
import SecondaryProducts from './components/products/SecondaryProducts';
import SingleProduct from './components/products/SingleProduct';
import Cart from './components/products/Cart';
import Navbar from './components/navbar/Navbar';
import { FaWhatsapp } from 'react-icons/fa';
import "./App.css"

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCartItems(cartItems.map(cartItem => 
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const updateCartItemQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
    } else {
      setCartItems(cartItems.map(cartItem => 
        cartItem.id === itemId ? { ...cartItem, quantity: newQuantity } : cartItem
      ));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(cartItem => cartItem.id !== itemId));
  };

  return (
    <Router>

      <Navbar/>
      <a href='/'>
        <div  className='homepage-watsap'><FaWhatsapp/> <span>chat with Us on Whatsapp.</span> </div>
      </a>
      
      <Routes>
       
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:productName" element={<SecondaryProducts />} />
        <Route 
          path="/products/:productName/:productId" 
          element={<SingleProduct addToCart={addToCart} />} 
        />
        <Route 
          path="/cart" element={<Cart cartItems={cartItems} updateCartItemQuantity={updateCartItemQuantity} removeFromCart={removeFromCart} />} 
          />
      </Routes>
    </Router>
  );
};

export default App;