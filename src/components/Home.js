import React from 'react'
import './Home.css';
import Header from './Header'
const Home = () => {
  return (
    <div className='background'>
      <Header/>
      <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center ">
    <div className="col-md-5 p-lg-5 mx-auto my-5">
      <h1 className="display-4 fw-normal">Welcome to Explore & Express </h1>🌍✈️ Explore, Share, Inspire ✈️🌍
      <p className="lead fw-normal">Embark on a journey with us as we bring together a community of passionate globetrotters who have traversed the corners of the Earth, creating a tapestry of incredible travel stories. At [Blog Name], we believe in the power of shared experiences, and here, every adventure finds its voice.</p>
    </div>
    <div className="product-device shadow-sm d-none d-md-block"></div>
    <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
  </div>
    </div>
  )
}

export default Home
