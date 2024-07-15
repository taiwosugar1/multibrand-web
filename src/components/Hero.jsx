import React, { useEffect, useState } from 'react'
import { GoArrowRight } from "react-icons/go";
import "./Hero.css"
import { Link } from 'react-router-dom';
import images from './products/Image.js';
import { FaSearch } from 'react-icons/fa';

const Hero = () => {


  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // 3000ms = 3 seconds
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='hero'>
      <div className="hero-container">
        <div className="hero-box-one">
          <h1>WHAT WOULD YOU LIKE TO PRINT ?</h1>
          <div className="search-box">
            <input type="text" placeholder="Search here..." />
            <button className="search-button"><FaSearch /></button>
          </div>
          <Link to={"https://wa.me/2348029299901"}>
            <button className="start-print-button">Start Printing < GoArrowRight /></button>
          </Link>
        </div>

        <div className="hero-box-two">
          <img src={images[imageIndex].url} alt={images[imageIndex].alt} />
        </div>
      </div>
    </div>
  )
}

export default Hero;