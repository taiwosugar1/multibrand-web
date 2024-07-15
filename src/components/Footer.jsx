import React from 'react'
import { FaFacebook, FaInstagram, FaPhone, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import "./Footer.css"
import { MdEmail } from 'react-icons/md'

const Footer = () => {
  return (
    <footer className='footer'>
        <div className='footer-one'>
        <img src="/images/paystack.png" alt="" />
            <p className='first-image'> Thank you for choosing Multibrand Digital Services, where your ideas take shape and come to life.</p>
        </div>
        
         <div className="footer-social">
            <a href="https://facebook.com/multibrandprint"><FaFacebook/></a>
            <a href="https://instagram.com/multibrandprints"><FaInstagram/></a>
            <a href="https://twitter.com/oguntoyintaiwo"><FaTwitter/></a>
            <a href="https://wa.me/2348029299901"><FaWhatsapp/></a>
            <a href="tel: +2348029299901"><FaPhone/></a>
            <a href="mailto:multibranddigital@gmail.com"><MdEmail/></a>
         </div>
         <p className='footer-under'>Copyright 2024 © <b>Multibrand Digital Services</b> <br />All rights reserved.</p>
       </footer>
  )
}

export default Footer