import React from 'react'
import Navbar from './Navbar'
import Home from './Home'
import bg from './videos/background.mp4'
const HeroSection = () => {
  const vidstyle={
    position: 'fixed',
    right: 0,
    bottom: 0,
    width: '100vw',
    zIndex: -1,
    opacity: .9
  }
  return (
    <div className='relative p-10 h-screen'>
        <Navbar />
        <Home />
        <div>
          <video src={bg} loop autoPlay muted style={vidstyle}></video>
        </div>
    </div>
  )
}

export default HeroSection