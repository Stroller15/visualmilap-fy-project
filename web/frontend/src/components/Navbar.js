import React from 'react'
import {useNavigate} from 'react-router-dom';
const Navbar = () => {
  const navigate = useNavigate();
  return (
    
    <navbar className="flex justify-between items-center ">
        <div>
            <a href="#" className='text-3xl font-bold text-white'>Visual<span className='text-blue-700'>Milap</span></a>
        </div>
        <div className='flex items-center space-x-4 font-semibold text-white'>
            <a href='#'>Home</a>
            <a href='#howitworks'>How it works?</a>
            <button className='bg-blue-600 p-3 rounded-md text-white' onClick={()=>{navigate('/login')}}>Get started</button>
        </div>

    </navbar>
  )
}

export default Navbar