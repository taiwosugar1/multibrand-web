import React from 'react'
import ProductsList from '../components/products/ProductList'
import Hero from '../components/Hero'
import Hero2 from '../components/Hero2'

const Home = () => {
  return (
    <div className='home'>
      <Hero2/>
      <Hero/>
      <ProductsList/>
      </div>
  )
}

export default Home