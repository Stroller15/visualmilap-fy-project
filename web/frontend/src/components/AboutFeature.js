import React from 'react'
import face_scan from './images/face_scanner.png'
import skeleton from './images/skelton.png'
const AboutFeature = () => {
  return (
    <div className='flex flex-col w-screen h-screen mt-10 p-10 bg-blue-600' style={{background:'transparent'}} id='howitworks'>
        <div className='flex items-center justify-between mt-10 px-10'>
            <img className='w-[400px] h-[400px]'  src={face_scan} alt='face_scanner'/>
            <div className='text-white'>
                <p className='text-4xl mb-4'>Capture Your Essence</p>
                <p className='text-3xl'>Use Your Camera Feature To Capture <br/> Your Unique Facial Features</p>
            </div>
        </div>
        <div className='flex items-center justify-between mt-10 px-10'>
            <div className='text-white'>
                <p className='text-4xl mb-4'>Unveil Your Memories</p>
                <p className='text-3xl font-serief'>Our Advanced Algorithms Analyze Your <br/> Face to Unlock Photos From Attended Events</p>
            </div>
            <img className='w-[400px] h-[400px]'  src={skeleton} alt='skelton'/>
        </div>
        
    </div>
  )
}

export default AboutFeature