import React, { useState } from 'react';
import "./Navbar.css";
import { FaPhone, FaSearch, FaUser, FaBars } from 'react-icons/fa';
import { FaCartFlatbed } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { IoLogoWhatsapp } from 'react-icons/io';

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className='navbar'>
        <header>
            <div className="logo">
                <h3>MULTIBRAND</h3>
            </div>
            <ul className={`ul-list ${dropdownVisible ? 'show' : ''}`}>
                <Link to="/product-list"><li>All Products</li></Link>
                <Link><li>About Us</li></Link>
               <Link><li>Call For Designs</li></Link>
                <Link to="/"> <li>Home</li></Link>
            </ul>
            <ul className='ul-icon'>
                <li><FaSearch/></li>
                <Link to="tel: +234-802-929-9901"><li><FaPhone/></li></Link>
                <Link to='https://wa.me/2348029299901'> <li className='watsap-icon'><IoLogoWhatsapp /> </li></Link>
                <Link to={"/cart"}><li className="cart-icon"><FaCartFlatbed/></li></Link>
                <li><FaUser/></li>
            </ul>
            <button className="dropdown-btn" onClick={toggleDropdown}><FaBars /></button>
        </header>
    </div>
  );
};

export default Navbar;