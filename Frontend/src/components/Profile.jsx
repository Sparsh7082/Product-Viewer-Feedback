import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from './Navbar'

const Profile = () => {
    const token = localStorage.getItem('token')

    const [user, setUser] = useState([])

    useEffect(()=>{
        const fetchUser = async() => {
            const res = await axios.get('http://localhost:8080/api/user/getUser',{
            headers: { authorization: `Bearer ${token}` }
            })
            setUser(res.data.user)
        }
        fetchUser()
    },[])
    console.log(user);

    const [editMode, setEditMode] = useState(false)
    const [formData, setFormData] = useState({ name: '', email: '', phoneNumber: '' })

    const onEdit = () => {
        setEditMode(true)
        setFormData({name: user?.name, email: user?.email, phoneNumber: user?.phoneNumber})
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    
    const handleUpdate = async () => {
        try {
            const res = await axios.put('http://localhost:8080/api/user/updateUser', formData, {
                headers: { authorization: `Bearer ${token}` }
            })
            setUser(res.data.user)
            setEditMode(false)
            window.location.reload()
        } catch (err) {
            console.error(err)
            alert('Update failed')
        }
    }

    const handleDelete = async () => {
        try {
            await axios.delete('http://localhost:8080/api/user/deleteUser', {
                headers: { authorization: `Bearer ${token}` }
            })
            await axios.delete('http://localhost:8080/api/feedback/delete-All-Feedbacks-Of-User', {
                headers: { authorization: `Bearer ${token}` }
            })
            
            localStorage.removeItem('token')
            window.location.href = '/register'
        } catch (err) {
            console.error(err)
            alert('Delete failed')
        }
    }
  return (
        <div>
            <Navbar heading='Profile' />
            <div className='text-center text-2xl p-4'>
                {editMode ? (
                    <div className='space-y-4'>
                        <label htmlFor="name">Name</label><br />
                        <input
                            type='text'
                            name='name'
                            placeholder='enter name'
                            value={formData.name}
                            onChange={handleChange}
                            className='border p-2 rounded'
                        />
                        <br />
                        <label htmlFor="email">Email</label><br />
                        <input
                            type='email'
                            name='email'
                            placeholder='enter email'
                            value={formData.email}
                            onChange={handleChange}
                            className='border p-2 rounded'
                        />
                        <br />
                        <label htmlFor="phoneNumber">Phone Number</label><br />
                        <input
                            type='text'
                            name='phoneNumber'
                            placeholder='enter phone number'
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className='border p-2 rounded'
                        />
                        <br />
                        <button onClick={handleUpdate} className='bg-green-500 text-white px-4 py-2 rounded'>Save</button>
                        <button onClick={() => setEditMode(false)} className='ml-2 bg-gray-400 text-white px-4 py-2 rounded'>Cancel</button>
                    </div>
                ) : (
                    <div>
                        <p>Hello, {user?.name}</p>
                        <p>{user?.email}</p>
                        <p>{user?.phoneNumber}</p>
                        <div className='mt-4 space-x-4'>
                            <button onClick={onEdit} className='bg-blue-500 text-white px-4 py-2 rounded'>Edit</button>
                            <button onClick={handleDelete} className='bg-red-600 text-white px-4 py-2 rounded'>Delete</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
  )
}

export default Profile
