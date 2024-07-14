import React, { useEffect, useState } from 'react'
import { FaArrowAltCircleRight, FaSearch } from "react-icons/fa";
import "./Hero.css"
import { Link } from 'react-router-dom';


const Hero = () => {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTitleIndex((prevIndex) => (prevIndex + 1) % 3);
      // 3 is the number of titles
    }, 5000);
     // 4000ms = 4 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='hero'>
       <div className="hero-container">
        

        <div className="hero-box-one">
        <h1>WHAT WOULD YOU LIKE TO PRINT ?</h1>
         <div className="search-box">
           <input type="text" placeholder="Search here..." />
           <button className="search-button"><FaSearch/></button>
           
        </div>
        <Link to={"https://wa.me/2348029299901"}><button className="start-print-button">Start Printing <FaArrowAltCircleRight/></button></Link>
        
        </div>

        <div className="hero-box-two">
             {[
              <img key="title1" src='/images/bus3.png' alt=''/>,
              <img key="title2" src='/images/book7.png' alt=''/>,
              <img key="title3" src='/images/cloth3.png' alt=''/>
             ][titleIndex]}
             
        </div>
       </div>
    </div>
  )
}

export default Hero

