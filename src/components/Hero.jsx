import React from 'react'
import { FaSearch } from "react-icons/fa";
import "./Hero.css"


const Hero = () => {
  return (
    <div className='hero'>
       <div className="hero-container">
        

        <div className="hero-box-one">
        <h1>WHAT WOULD YOU LIKE TO PRINT ?</h1>
         <div className="search-box">
           <input type="text" placeholder="Search here..." />
           <button className="search-button"><FaSearch/></button>
        </div>
        
        </div>

        <div className="hero-box-two">
          <img src="/images/bus7.png" alt="" />
        </div>
       </div>
    </div>
  )
}

export default Hero

