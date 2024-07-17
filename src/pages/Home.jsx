import React from 'react'
import ProductsList from '../components/products/ProductList'
import Hero from '../components/Hero'
import Hero2 from '../components/Hero2'
import ImageSlider from '../components/ImageSlider'
import images from '../components/products/Image'

const Home = () => {
  return (
    <div className='home'>
      <Hero2/>
      <Hero/>
      <ImageSlider images={images}/>
      <ProductsList/>
      </div>
  )
}

export default Home