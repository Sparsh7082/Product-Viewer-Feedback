import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/login`,{
                email,
                password
            })

            localStorage.setItem('token',res.data.token)
            navigate('/')
            window.location.reload()

        } catch (error) {
            alert('login failed')
            navigate('/register')
        }
    }
  return (
    <div className='flex flex-col w-1/3 m-auto min-h-screen justify-center'>
      <form onSubmit={handleSubmit} className='rounded-xl bg-white flex flex-col items-center p-4 gap-5'>
        <h2 className='text-3xl font-bold'>Login</h2>
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
        className='rounded-xl bg-green-500 text-white font-bold p-2'>login</button>
      </form>

      <div>don't have account? <button onClick={() => navigate('/register')}>Register</button></div>
    </div>
  )
}


export default Login
