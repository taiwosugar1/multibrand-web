// src/components/admin/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
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

  const deleteProduct = async (productId) => {
    try {
      await deleteDoc(doc(db, 'products', productId));
      toast.success('Product deleted successfully!');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product: ', error);
      toast.error('Failed to delete product. Please try again.');
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
    setLoading(false);

    const unsubscribe = onSnapshot(collection(db, 'orders'), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          toast.info('A new order has been submitted!');
        }
      });
    });

    return () => unsubscribe();
  }, []);

  const handleProductAdded = async () => {
    try {
      await fetchProducts();
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

      <div className="added-products">
      <h3>Added Products</h3>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <img src={product.imageUrl} alt={product.name} />
            <p>Name: {product.name}</p>
            <p>Price: ${product.price}</p>
            <p>Description: {product.description}</p>
            <p>Timestamp: {new Date(product.timestamp.seconds * 1000).toLocaleString()}</p>
            <button onClick={() => deleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
      </div>

      <div className="order">
      <h3>Orders</h3>
      <ul>
        {orders.map(order => (
          <li key={order.id} className='customer-order'>
            <p>Customer Name: {order.customerDetails.name}</p>
            <p>Customer Phone: {order.customerDetails.phone}</p>
            <p>Customer Address: {order.customerDetails.address}</p>
            <p>Timestamp: {new Date(order.timestamp.seconds * 1000).toLocaleString()}</p>
            <h4>Items:</h4>
            <ul className='customer-order-details'>
              {order.items.map(item => (
                <li key={item.id}>
                  <img src={item.imageUrl}  alt=""  />
                  <p>Name: {item.name}</p>
                  <p>Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      </div>
      <UserFeedbackList />
      <ToastContainer />
    </div>
  );
};

export default AdminDashboard;