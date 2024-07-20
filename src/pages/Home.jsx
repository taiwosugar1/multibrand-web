import React, { useState, useEffect } from 'react'
import ProductsList from '../components/products/ProductList'
import Hero from '../components/Hero'
import Hero2 from '../components/Hero2'
import ImageSlider from '../components/ImageSlider'
import images from '../components/products/Image'
import ImagePopup from '../components/products/ImagePopup'

const Home = () => {

  const [showPopup, setShowPopup] = useState(true);
  const imagesList = [
    '/images/book2.png',
    '/images/cloth1.png',
    '/images/bag5.png',
    '/images/box3.png',
  ];
  const videoUrl = 'https://youtu.be/4yrpJn0kNNM?list=PLTDgOUcX23hZV_2UMa84NZmfpTl-OwP-b'; // Example video URL

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 4000);

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className='home'>
      <div className="home-page">
           {
           showPopup && <ImagePopup images={imagesList} videoUrl={videoUrl} onClose={handleClosePopup} 
           />
           }
      </div>
      <Hero2/>
      <Hero/>
      <ImageSlider images={images}/>
      <ProductsList/>
      </div>
  )
}

export default Home