import React from 'react'
import "./AboutUs.css"
import { FaLinkedin, FaPhone, FaWhatsapp } from 'react-icons/fa';


const AboutUs = () => {
  
  return (
    <div className='about'>
        <h1>About Us</h1>
        <div className='paragraph'>
            <p>
            Welcome to Multibrand Digital Services, your premier destination for high-quality printing solutions. With a commitment to excellence and a passion for creativity, we specialize in bringing your visions to life through exceptional printing services. Whether you need business cards, branded merchandise, promotional materials, or custom prints, our team of experts is dedicated to delivering products that exceed your expectations.</p>
            <p>
            At Multibrand Digital Services, we understand that every project is unique, and we take pride in offering personalized service tailored to your specific needs. Our state-of-the-art technology and attention to detail ensure that every print is of the highest quality, reflecting the professionalism and creativity you deserve.</p>

            <p>Founded and led by Taiwo, a visionary with a deep passion for the printing industry, we strive to create lasting impressions through our work. Taiwo's dedication to quality and customer satisfaction drives our mission to be your trusted partner for all your printing needs.</p>
        </div>
         <h2>Our Team</h2>

         <div className='our-team'>
         <div className="about-team">
            <img src="https://media.licdn.com/dms/image/D4D03AQHKieTe_SeVSw/profile-displayphoto-shrink_400_400/0/1699351850648?e=1726704000&v=beta&t=zc_VNEKQRn6FIRNKGInxdlYvIDBci1v8ZTG8OJE5jXQ" alt="" />
            <div className="about-team-info">
                <h3>Oguntoyinbo Taiwo O.</h3>
                 <p>Founder</p>
                 <h4>Multibrand Digital Services</h4>
            </div>
         </div>
         <div className="about-team">
         <p className='taiwo-p'>Taiwo, the visionary owner of Multibrand Digital Services, is passionate about delivering exceptional printing services and ensuring every project meets the highest standards of quality and creativity.</p>
          <p className='taiwo-p'>With a dedication to customer satisfaction and a keen eye for detail, Taiwo leads our team to consistently exceed expectations.</p>
          <div className="about-social">
           <a href="https://www.linkedin.com/in/oguntoyinbo-taiwo-894466127/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3ByoSCyOb4THS%2FrfcSEzE1Aw%3D%3D"><FaLinkedin/></a>
            <a href="https://wa.me/2348029299901"><FaWhatsapp/></a>
            <a href="tel: +2348029299901"><FaPhone/></a>
         </div> 
         </div>
         

         </div>
        
    </div>
  )
};

export default AboutUs;