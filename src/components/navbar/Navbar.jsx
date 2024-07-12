import React from 'react'
import "./Navbar.css"
import { FaPhone, FaSearch, FaUser, FaWhatsapp } from 'react-icons/fa'
import { FaCartFlatbed } from 'react-icons/fa6'

const Navbar = () => {
  return (
    <div className='navbar'>
        <header>
            
                <div className="logo">
                    <h3>MULTIBRAND</h3>
                </div>
                <ul className='ul-list'>
                    <li>All Product</li>
                    <li>About Us</li>
                    <li>Blog</li>
                    <li>Call For Designs</li>
                    <li>Customers</li>
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
