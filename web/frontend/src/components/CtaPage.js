import React from 'react'
import share from './images/share.png'
import {useNavigate} from 'react-router-dom'
const CtaPage = () => {
    let navigate = useNavigate();
  return (
    <div className='flex w-screen h-screen flex-col p-20 mt-20 bg-slate-500' style={{background:'transparent'}}>
        <div className='flex items-center justify-between'>
            <img className='w-[400px] h-[400px]' src={share} alt='share'/>
            <div className='text-white'>
                <p className='text-4xl mb-10'>Relive and Share Memonts</p>
                <p className='text-3xl'>Explore and relieve cherished memories from events, <br/> then easily share them with loved ones</p>
            </div>
        </div>
        <button className='bg-blue-600 w-[200px] h-20 rounded-md mt-20' style={{fontSize:'25px', fontWeight:'700'}} onClick={()=>{navigate('/login')}}>Get Started</button>
        
    </div>
  )
}

export default CtaPage