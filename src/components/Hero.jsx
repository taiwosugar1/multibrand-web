import React from 'react'
import { FaSearch } from "react-icons/fa";
import "./Hero.css"


const Hero = () => {
  return (
    <div className='hero'>
       <div className="hero-container">
        

        <div className="hero-box-one">

         <div className="search-box">
           <input type="text" placeholder="Search here..." />
           <button className="search-button"><FaSearch/></button>
        </div>
        <h1>WHAT WOULD YOU LIKE TO PRINT</h1>
        </div>

        <div className="hero-box-two">
          <h1>Print your designs</h1>
        </div>
       </div>
    </div>
  )
}

export default Hero

