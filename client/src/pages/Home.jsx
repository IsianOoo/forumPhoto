import React from 'react'

export default function Home() {
  return (
    <div className='relative w-full h-screen bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url('../img/homebcg.jpg')` }}>
      <div className='  absolute bg-black bg-opacity-30 w-screen h-screen'></div>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-4'>
        
        <h1 className='uppercase font-bold text-4xl md:text-5xl lg:text-7xl text-white opacity-0 animate-fadeInSlide'>Share your vision of the world!</h1>
        <p className='text-white text-sm md:text-base lg:text-lg mt-4 max-w-xl mx-auto opacity-0 animate-fadeInSlide delay-300'>Discover captivating photos from all styles and genres worldwide. Here, true artisty takes center stage, not fleeting trends.</p>
      </div>
    </div>
  )
}
