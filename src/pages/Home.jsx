import React from 'react'
import ProductsList from '../components/products/ProductList'
import Hero from '../components/Hero'

const Home = () => {
  return (
    <div className='home'>
      <Hero/>
      <ProductsList/>
      </div>
  )
}

export default Home