// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/products/ProductList';
import SecondaryProducts from './components/products/SecondaryProducts';
import SingleProduct from './components/products/SingleProduct';
import Cart from './components/admin/Cart';
import Navbar from './components/navbar/Navbar';
import { FaWhatsapp } from 'react-icons/fa';
import Swal from 'sweetalert2';
import "./App.css";
import Home from './pages/Home';
import Footer from './components/Footer';
import AboutUs from './pages/AboutUs';
import Category from './components/navbar/Category';
import Login from './components/admin/Login';
import AdminDashboard from './components/admin/AdminDashboard';
import FeedbackForm from './components/admin/FeedbackForm';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import UserFeedbackList from './components/admin/UserFeedbackList';
import SingleProductPage from './components/admin/SingleProductPage';
import AdminProductList from './components/admin/AdminProductList';
import AdminCategoryList from './components/admin/AdminCategoryList';
import AdminCategoryPage from './components/admin/AdminCategoryPage';
import { CartProvider } from './CartContext';

const App = () => {
 
  const showSwal = () => {
    Swal.fire({
      title: 'Select a Category',
      html: `
        <div>
          <a href="/category/Books" class="swal-category-link">Books</a><br/>
          <a href="/category/Tshirt_branding" class="swal-category-link">T-Shirt Branding</a><br/>
          <a href="/category/Custom_Mugs" class="swal-category-link">Mugs</a><br/>
          <a href="/category/Branding" class="swal-category-link">Branding</a><br/>
          <a href="/category/Bags" class="swal-category-link">Bags</a><br/>
        </div>
      `,
      showCloseButton: true,
      showConfirmButton: false
    });
  };

  return (
    <AuthProvider>
      <CartProvider>
      <Router>
        <div className='call'>
          <p>+234 802 929 9901, +234 912 960 7191</p>
        </div>

        <Navbar showSwal={showSwal} />
        <a href='https://wa.me/2348029299901'>
          <div className='homepage-watsap'><FaWhatsapp /> <span>Whatsapp quick chat.</span> </div>
        </a>

        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path="/product-list" element={<ProductList />} />
          <Route path="/products/:productName" element={<SecondaryProducts />} />
          <Route 
            path="/products/:productName/:productId" 
            element={<SingleProduct />} 
          />
          <Route 
            path="/cart" element={<Cart />} 
          />
          <Route path="/category/:category" element={<Category />} />

     {/* --------------the Admin route------------- */}

          <Route path="/login" element={<Login />} />
          <Route path="/adminproducts" element={<AdminProductList />} />
          <Route path="/admin" element={<ProtectedRoute element={AdminDashboard} />} />
        
          <Route path="/feedback" element={<FeedbackForm />} />
          <Route path="/feedbacklist" element={<UserFeedbackList />} />
          <Route path="/product/:productId" element={<SingleProductPage />} />
          <Route path="/category/:category" element={<Category />} />
          <Route path="/category/:categoryName" element={<AdminCategoryPage />} />
          <Route path="/category" element={<AdminCategoryList />} />
          
          
        </Routes>
        <Footer />
      </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;