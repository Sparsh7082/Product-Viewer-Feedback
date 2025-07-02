import React from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Products from './components/Products'
import Feedbacks from './components/Feedbacks'
import Profile from './components/Profile'


const App = () => {
  const token = localStorage.getItem('token')


  return (
    <div className='flex flex-col'>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={token ? <Products/> : <Navigate to='/login'/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/feedbacks' element={token ? <Feedbacks/> : <Navigate to='/login'/>}/>
            <Route path='/profile' element={token ? <Profile/> : <Navigate to='/login'/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  )
}


export default App
