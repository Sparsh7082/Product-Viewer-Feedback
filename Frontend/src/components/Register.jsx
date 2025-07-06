import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Register = () => {
    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState(0)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
   
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/register`,{
                name,
                phoneNumber,
                email,
                password
            })
   
            localStorage.setItem('token',res.data.token)
            navigate('/')
            window.location.reload()
   
        } catch (error) {
            alert('register failed: email or phone number already exists')
        }
    }
  return (
    <div className='flex flex-col w-1/3 m-auto min-h-screen justify-center'>
      <form onSubmit={handleSubmit} className='rounded-xl bg-white flex flex-col items-center p-4 gap-5'>
        <h2 className='text-3xl font-bold'>Register</h2>

        <input type="text" 
        placeholder='enter name'
        onChange={(e) => setName(e.target.value)}
        className='border-2 border-gray-400 rounded-xl text-center text-3xl'/>

        <input type="number" 
        placeholder='enter Phone Number'
        onChange={(e) => setPhoneNumber(e.target.value)}
        className='border-2 border-gray-400 rounded-xl text-center text-3xl'/>

        <input
        type="text"
        placeholder='enter email'
        onChange={(e) => setEmail(e.target.value)}
        className='border-2 border-gray-400 rounded-xl text-center text-3xl'/>


        <input
        type="password"
        placeholder='enter password'
        onChange={(e) => setPassword(e.target.value)}
        className='border-2 border-gray-400 rounded-xl text-center text-3xl'/>


        <button
        type='submit'
        className='rounded-xl bg-green-500 text-white font-bold p-2'>register</button>
      </form>

      <div>have account? <button onClick={() => navigate('/login')} className='cursor-pointer text-blue-500'>Login</button></div>
    </div>
  )
}


export default Register
