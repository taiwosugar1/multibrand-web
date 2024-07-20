// src/components/ImagePopup.jsx
import React, { useEffect, useState } from 'react';
import './ImagePopup.css';
import { FaLongArrowAltRight, FaTimes } from 'react-icons/fa';


const ImagePopup = ({ images, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showCloseButton, setShowCloseButton] = useState(false);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => prevIndex + 1);
    }, 1300);

    return () => clearInterval(imageInterval);
  }, []);

  useEffect(() => {
    if (currentImageIndex >= images.length) {
      setShowCloseButton(true);
      setCurrentImageIndex(images.length - 4); // Stay on the last image
    }
  }, [currentImageIndex, images.length]);

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <img src={images[currentImageIndex]} alt="Popup" />
        {showCloseButton && <button onClick={onClose}><FaTimes /></button> }
        <h1>Welcome to Multibrand Digital Services</h1>
      <h3>Your Home of Printing</h3>
      <p>Discover quality printing solutions tailored to your needs. From vibrant promotional materials to personalized stationery, we're here to bring your ideas to life with precision and excellence. Explore our range of services and let's create something remarkable together! </p>
      <a href="/adminproducts"><FaLongArrowAltRight /></a>
     
      </div>
    </div>
  );
};

export default ImagePopup;


