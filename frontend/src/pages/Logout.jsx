import React from 'react'
import { Link,useNavigate } from 'react-router-dom'

const Logout = () => {
  const navigate = useNavigate();
  const type = localStorage.getItem('type');
  const handleClick = ()=>{
    localStorage.removeItem('type');
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 to-purple-200'>
        <div className='w-100 h-40 bg-white rounded-xl shadow-xl flex flex-col items-center'>
           <p className='mt-5 text-xl'>Are you sure you want to log out?</p>
           <div className='w-[40%] flex justify-between mt-8'>
           <Link to={`/${type?.toLowerCase() || 'dashboard'}`} className='px-3 py-1 border-black border-2 rounded-lg text-black
           transform transition-transform duration-100 ease-in-out hover:scale-120'>No</Link>
           <button className='bg-red-700 px-3 py-1 border-black border-2 rounded-lg text-gray-200 
           transform transition-transform duration-100 ease-in-out hover:scale-120' onClick={()=>handleClick()}>Yes</button>
           </div>
        </div>
    </div>
  )
}

export default Logout
