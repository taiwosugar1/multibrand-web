import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaPhone, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import "./Footer.css"

const Footer = () => {
  return (
    <footer className='footer'>
        <div className='footer-one'>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate mollitia dolore nam?</p>
        </div>
         <div className="footer-social">
            <a href="https://facebook.com/multibrandprint"><FaFacebook/></a>
            <a href="https://instagram.com/multibrandprints"><FaInstagram/></a>
            <a href="https://twitter.com/oguntoyintaiwo"><FaTwitter/></a>
            <a href="https://linkedn.com/"><FaLinkedin/></a>
            <a href="https://wa.me/2348029299901"><FaWhatsapp/></a>
            <a href="tel: +2348029299901"><FaPhone/></a>
         </div>
         <p className='footer-under'>Copyright 2024 © <b>Multibrand Digital Services</b> <br />All rights reserved.</p>
       </footer>
  )
}

export default Footer