import React from 'react'
import demo from './videos/demo.mp4'
const Home = () => {
  return (
    <div className='flex mt-[120px] p-15 justify-between items-center'>
      <div className='flex flex-col text-white text-6xl'>
        <div className='mb-10'>Welcome to VisualMilap <br/>Where Memory Comes Alive!</div>
        <div className='font-serif'>Deliver Images Faster Better</div>
      </div>
      <div>
        <video width={600} height={400} src={demo} loop autoPlay muted className='text-white bg-red-800 rounded-lg'></video>
      </div>
    </div>
  )
}

export default Home