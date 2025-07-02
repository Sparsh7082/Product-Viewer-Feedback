import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import profile from '/profile.svg'

const Navbar = ({heading}) => {
    const navigate = useNavigate()
    const location = useLocation()

    const logout = () => {
        localStorage.removeItem('token')
        navigate("/login");
    }
  return (
    <div className='grid grid-cols-3 text-center justify-center items-center text-2xl font-bold'>
      <button onClick={()=>navigate('/')}>Home</button>
      <h1>{heading}</h1>
      <div className='flex justify-end mr-10'>
        {
          location.pathname === '/profile' ? (
            <button onClick={logout} className='text-red-700'>Logout</button>
          ) : (
            <img src={profile} alt="profile" width='30' onClick={()=>navigate('/profile')} className='flex justify-end'/>
          )
        }
      </div>
    </div>
  )
}

export default Navbar
