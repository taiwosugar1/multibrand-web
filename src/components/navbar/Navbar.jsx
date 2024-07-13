import React from 'react'
import "./Navbar.css"
import { FaPhone, FaSearch, FaUser } from 'react-icons/fa'
import { FaCartFlatbed } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { IoLogoWhatsapp } from 'react-icons/io'

const Navbar = () => {
  return (
    <div className='navbar'>
        <header>
            
                <div className="logo">
                    <h3>MULTIBRAND</h3>
                </div>
                <ul className='ul-list'>
                    <Link to="/product-list"><li>All Products</li></Link>
                    <li>About Us</li>
                    <li>Call For Designs</li>
                    <Link to="/"> <li>Home</li></Link>
                </ul>
                <ul className='ul-icon'>
                    <li><FaSearch/></li>
                    <Link to="tel: +234-802-929-9901"><li><FaPhone/></li></Link>
                    <Link to='https://wa.me/2348029299901'> <li className='watsap-icon'><IoLogoWhatsapp /> </li></Link>
                
                   <Link to={"/cart"}><li className="cart-icon"><FaCartFlatbed/></li></Link> 
                    <li><FaUser/></li>
                </ul>
            
        </header>
    </div>
  )
}

export default Navbar
