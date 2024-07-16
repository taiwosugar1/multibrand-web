import React, { useEffect, useState } from 'react'
import { GoArrowRight } from "react-icons/go";
import "./Hero.css"

import images from './products/Image.js';
import { FaSearch } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Hero = () => {


  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // 3000ms = 3 seconds
    return () => clearInterval(intervalId);
  }, []);

  const showSwal = () => {
    Swal.fire({
      title: 'Select a Category',
      html: `
        <div class="category-showSwal">
          <p><a href="/category/Books" class="swal-category-link">Books</a></p>
          <p><a href="/category/Tshirt_branding" class="swal-category-link">T-Shirt Branding</a></p>
          <p><a href="/category/Custom_Mugs" class="swal-category-link">Mugs</a></p>
          <p><a href="/category/Branding" class="swal-category-link">Branding</a></p>
          <p><a href="/category/Bags" class="swal-category-link">Bags</a></p>
        </div>
      `,
      showCloseButton: true,
      showConfirmButton: false
    });
  };
  


  return (
    <div className='hero'>
      <div className="hero-container">
        <div className="hero-box-one">
          <h1>WHAT WOULD YOU LIKE TO PRINT ?</h1>
          <div className="search-box">
            <input type="text" placeholder="Search here..." />
            <button className="search-button"><FaSearch /></button>
          </div>
          
            <button className="start-print-button" onClick={showSwal }>Start Printing < GoArrowRight /></button>
         
        </div>

        <div className="hero-box-two">
          <img src={images[imageIndex].url} alt={images[imageIndex].alt} />
        </div>
      </div>


      <style>
  {`
  .category-showSwal {
    border: 1px solid grey;
    background-color: #333;
  }

  .category-showSwal p {
    color: #fff;
    border-bottom: 1px solid white;
    padding: 8px 0;
  }

   .category-showSwal p:hover {
    color: aqua;
    text-decoration: underline;
  }

  .swal-category-link {
    text-decoration: none;
    color: inherit;
  }
  `}
</style>

    </div>
  )
}

export default Hero;