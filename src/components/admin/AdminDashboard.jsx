import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useAuth } from '../../AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdminDashboard.css';
import AddProductForm from './AddProductForm';
import UserFeedbackList from './UserFeedbackList';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();
  

  const fetchProducts = async () => {
    try {
      const productCollection = collection(db, 'products');
      const productSnapshot = await getDocs(productCollection);
      setProducts(productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', err);
    }
  };

  const fetchOrders = async () => {
    try {
      const ordersCollection = collection(db, 'orders');
      const ordersSnapshot = await getDocs(ordersCollection);
      setOrders(ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      
    } catch (err) {
      setError('Failed to fetch orders');
      console.error('Error fetching orders:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
    setLoading(false);
  }, []);

 

  const handleProductAdded = async () => {
    try {
      await fetchProducts(); // Fetch products again after adding
      toast.success('Product added successfully!');
    } catch (error) {
      console.error('Error adding product: ', error);
      toast.error('Failed to add product. Please try again.');
    }
  };

  if (!currentUser) {
    return <p className="loading">Loading...</p>;
  }

  if (loading) {
    return <p className="loading">Loading data...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <AddProductForm onProductAdded={handleProductAdded} />
      <h3>Products</h3>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <img src={product.imageUrl} alt={product.name} />
            <p>Name: {product.name}</p>
            <p>Price: ${product.price}</p>
            <p>Description: {product.description}</p>
            <p>Timestamp: {new Date(product.timestamp.seconds * 1000).toLocaleString()}</p>
          </li>
        ))}
      </ul>
      <h3>Orders</h3>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            <p>Customer Name: {order.customerDetails.name}</p>
            <p>Customer Phone: {order.customerDetails.phone}</p>
            <p>Customer Address: {order.customerDetails.address}</p>
            <p>Timestamp: {new Date(order.timestamp.seconds * 1000).toLocaleString()}</p>
            <h4>Items:</h4>
            <ul>
              {order.items.map(item => (
                <li key={item.id}>
                  <p>Name: {item.name}</p>
                  <p>Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <UserFeedbackList /> {/* Include the UserFeedbackList component */}
      <ToastContainer /> {/* ToastContainer for displaying notifications */}
    </div>
  );
};

export default AdminDashboard;