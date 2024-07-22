// src/components/Cart.jsx
import React, { useContext, useState } from 'react';
import { CartContext } from '../../CartContext';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import emailjs from 'emailjs-com';
import './Cart.css';

const Cart = () => {
  const { cartItems, updateCartItemQuantity, removeFromCart, clearCart } = useContext(CartContext);
  const [hasDesign, setHasDesign] = useState(true);
  const [file, setFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

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

  const handleFlutterwavePayment = async () => {
    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const paymentData = {
      amount: totalAmount * 100, // Amount in kobo (e.g., 1000 kobo = 10 NGN)
      email,
      name,
      phone,
      callback_url: "http://localhost:3000/payment-success", // Redirect after payment
      tx_ref: `txn_${new Date().getTime()}` // Unique transaction reference
    };

    const response = await fetch('http://localhost:3000/flutterwave-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    const { paymentUrl } = await response.json();

    if (window.FwPay) {
      window.FwPay(paymentUrl); // Open Flutterwave checkout
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await handleFlutterwavePayment();
    } catch (error) {
      console.error('Error processing payment:', error);
      setSuccessMessage('Failed to process payment. Please try again.');
    }

    setLoading(false);
  };

  const handlePaymentSuccess = async (paymentId) => {
    try {
      const orderData = {
        customerDetails: {
          name,
          email,
          phone,
          address,
        },
        items: cartItems,
        timestamp: serverTimestamp(),
        designFile: file ? file.name : null,
        paymentId,
      };

      await addDoc(collection(db, 'orders'), orderData);

      // Send confirmation email
      const emailData = {
        to_name: name,
        to_email: email,
        message: `Thank you for your order! We have received your order and will process it shortly.`,
      };

      emailjs.send(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID, emailData, process.env.REACT_APP_EMAILJS_USER_ID)
        .then((response) => {
          console.log('Email sent successfully!', response.status, response.text);
        }, (err) => {
          console.error('Failed to send email.', err);
        });

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
                <img src={item.imageUrl} alt={item.title} />
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
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Phone:</label>
            <input
              type="text"
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
          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Proceed to Payment'}
          </button>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
};

export default Cart;