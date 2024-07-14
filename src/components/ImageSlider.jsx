import React, { useState } from 'react';
import './ImageSlider.css';


const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 3 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 3 ? 0 : prevIndex + 1
    );
  };
 

  return (
    <div className="bg-slider">
      <button className="bg-prev" onClick={prevSlide}>
        &#10094;
      </button>
      <div className="slider-wrapper" style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}>
        {images.map((image, index) => (
          <div
            key={index}
            className="slide"
            style={{ flex: `0 0 ${100 / 3}%` }}
          >
            <img src={image.url} alt={image.title} />
            
          </div>
        ))}
      </div>
      <button className="bg-next" onClick={nextSlide}>
        &#10095;
      </button>
      
      
    </div>
  );
};

export default ImageSlider;