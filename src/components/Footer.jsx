import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
import "./Footer.css"
import { MdEmail } from 'react-icons/md'
import { Link } from 'react-router-dom'
import Contact from '../pages/Contact'

const Footer = () => {
  return (
    <footer className='footer'>
        <div className='footer-one'>
        <Contact/>
        </div>
        
         <div className="footer-social">
            <a href="https://facebook.com/multibrandprint"><FaFacebook/></a>
            <a href="https://instagram.com/multibrandprints"><FaInstagram/></a>
            <a href="https://twitter.com/oguntoyintaiwo"><FaTwitter/></a>
            <a href="mailto:multibranddigital@gmail.com"><MdEmail/></a>
         </div>

         <div className="footer-links">
         
             <Link to={"/about"}><h4>About Us</h4></Link> 
         <Link to={"/term-condition"}><h4>T & C</h4></Link> 
         <Link  to={"/privacy-policy"}><h4>Privacy Policy</h4></Link> 
         

           <img src="/images/paystack.png" alt="" />
            <p className='first-image'> Thank you for choosing Multibrand Digital Services, where your ideas take shape and come to life.</p>
            <Link to={"http://multibrand-video.vercel.app/"}><button>Video Call</button></Link>

         </div>
         <p className='footer-under'>Copyright 2024 © <b>Multibrand Digital Services</b> <br />All rights reserved.</p>
       </footer>
  )
}

export default Footer