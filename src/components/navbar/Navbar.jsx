import React from 'react'
import "./Navbar.css"
import { FaPhone, FaSearch, FaUser, FaWhatsapp } from 'react-icons/fa'
import { FaCartFlatbed } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar'>
        <header>
            
                <div className="logo">
                    <h3>MULTIBRAND</h3>
                </div>
                <ul className='ul-list'>
                    <Link to="/products/"><li>All Product</li></Link>
                    <li>About Us</li>
                    <li>Blog</li>
                    <li>Call For Designs</li>
                    <Link to="/"> <li>Home</li></Link>
                </ul>
                <ul className='ul-icon'>
                    <li><FaSearch/></li>
                    <li><FaPhone/></li>
                    <li className='watsap-icon'><FaWhatsapp/></li>
                    <li className="cart-icon"><FaCartFlatbed/></li>
                    <li><FaUser/></li>
                </ul>
            
        </header>
    </div>
  )
}

export default Navbar
