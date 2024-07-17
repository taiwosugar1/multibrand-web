import React, { useState, useEffect } from 'react';
import images from './products/Image.js';
import { GrNext, GrPrevious } from 'react-icons/gr';
import './Hero2.css';



const App = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const lastIndex = images.length - 1;

  useEffect(() => {
    const handleResize = () => {
      const slider = document.querySelector('.slider');
      const widthSlider = slider.offsetWidth;
      const heightSlider = slider.offsetHeight;
      const diameter = Math.sqrt(Math.pow(widthSlider, 2) + Math.pow(heightSlider, 2));
      document.documentElement.style.setProperty('--diameter', diameter + 'px');
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    const setSlider = () => {
    

      document.getElementById('next').classList.remove('d-none');
      document.getElementById('prev').classList.remove('d-none');
      if (activeIndex === lastIndex) document.getElementById('next').classList.add('d-none');
      if (activeIndex === 0) document.getElementById('prev').classList.add('d-none');
    };
    setSlider();
  }, [activeIndex, lastIndex]);


  const nextSlide = () => {
    setActiveIndex((prev) => (prev === lastIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? lastIndex : prev - 1));

    
  };

  return (
    <main className='image-slider'>
      <section className="slider">
        <div className="list">
          {images.map((image, index) => (
            <div key={index} className={`item ${index === activeIndex ? 'active' : ''}`}>
              <div className="image" style={{ '--url': `url(${image.url})` }}></div>
              <div className="content">
                <h2>{image.title}</h2>
                <p>{image.description1}</p>
                {/* <p>{image.description2}</p> */}
              </div>
            </div>
          ))}
        </div>
        <div className="arrows">
          <button onClick={prevSlide} disabled={activeIndex === 0} id='prev'><GrPrevious /></button>
          <button onClick={nextSlide} disabled={activeIndex === lastIndex} id='next'><GrNext/></button>
        </div>
      </section>
     
    </main>
  );
};

export default App;