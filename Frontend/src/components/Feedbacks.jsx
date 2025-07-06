import React, { useEffect, useState } from 'react'
import axios from 'axios'
import FeedbackForm from './FeedbackForm'
import Navbar from './Navbar'

const Feedbacks = () => {
  const token = localStorage.getItem('token')

  const [products, setProducts] = useState([])

  const [userFeedbacks, setUserFeedbacks] = useState([])
  const [allFeedbacks, setAllFeedbacks] = useState([])

  const [feedbackPopup, setFeedbackPopup] = useState(false)
  const [feedback, setFeedback] = useState({ productId: '', title: '', description: '' })

  const [isEditing, setIsEditing] = useState(false)
  const [editFeedbackId, setEditFeedbackId] = useState(null)

  const fetchFeedbacks = async () => {
    const resUser = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/feedback/user-feedbacks`, {
      headers: { authorization: `Bearer ${token}` }
    })
    setUserFeedbacks(resUser.data.userFeedback)

    const resAll = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/feedback/all-feedbacks`, {
      headers: { authorization: `Bearer ${token}` }
    })
    setAllFeedbacks(resAll.data.allFeedback)
  }

  useEffect(() => {
    fetchFeedbacks()
  }, [])

  useEffect(() => {
    const fetchProducts = async() => {
      try {
          const res = await fetch('https://dummyjson.com/products')
          const data = await res.json()
          setProducts(data.products)
      } catch (error) {
        console.log("Failed to fetch products", error);
      }
    }
    fetchProducts()
  }, [])

  const handleEdit = (fb) => {
    setFeedback({
      productId: fb.productId,
      title: fb.title,
      description: fb.description
    })
    setEditFeedbackId(fb._id)
    setIsEditing(true)
    setFeedbackPopup(true)
  }

  const handleUpdate = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_BASE_URL}/api/feedback/update-feedback/${editFeedbackId}`, feedback, {
        headers: { authorization: `Bearer ${token}` }
      })
      setFeedbackPopup(false)
      setIsEditing(false)
      setEditFeedbackId(null)
      setFeedback({ productId: '', title: '', description: '' })
      fetchFeedbacks()
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/feedback/delete-feedback/${id}`, {
        headers: { authorization: `Bearer ${token}` }
      })
      fetchFeedbacks()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Navbar heading='Feedbacks'/>

      <h2 className='text-center text-xl font-semibold'>My feedbacks</h2>
      <div>
        {userFeedbacks.map((feedback) => (
          <div key={feedback._id} className='grid grid-cols-2 border rounded-md m-4 p-4'>
            <div>
              <p>Product ID: {feedback?.productId}</p>
              <p>User: {feedback?.user?.name}</p>
              <p>Title: {feedback?.title}</p>
              <p>Description: {feedback?.description}</p>
              <button onClick={() => handleEdit(feedback)} className='border p-1 rounded-md m-1'>Edit</button>
              <button onClick={() => handleDelete(feedback._id)} className='border p-1 rounded-md m-1 bg-red-500 text-white'>Delete</button>
            </div>

            <div>
              {
                products.filter((product)=>(product.id === parseInt(feedback?.productId)))
                .map((product) => (
                <div key={product.id}>
                  <p className='text-xl'>{product.title}</p>
                  <img src={product.thumbnail} alt={product.title} className='w-24 h-24 object-cover mt-2' />
                </div>
                ))
              }
            </div>
          </div>
        ))}
      </div>

      <h2 className='text-center text-xl font-semibold'>All feedbacks</h2>
      <div>
        {allFeedbacks.map((feedback) => (
          <div key={feedback._id} className='grid grid-cols-2 border rounded-md m-4 p-4'>
            <div>
              <p>Product ID: {feedback?.productId}</p>
              <p>User: {feedback?.user?.name}</p>
              <p>Title: {feedback?.title}</p>
              <p>Description: {feedback?.description}</p>
            </div>

            <div>
                {
                  products.filter((product)=>(product.id === parseInt(feedback?.productId)))
                  .map((product) => (
                  <div key={product.id}>
                    <p className='text-xl'>{product.title}</p>
                    <img src={product.thumbnail} alt={product.title} className='w-24 h-24 object-cover mt-2' />
                  </div>
                  ))
                }
            </div>
          </div>
        ))}
      </div>

      {feedbackPopup && (
        <FeedbackForm
          feedback={feedback}
          setFeedback={setFeedback}
          products={products}
          onCancel={() => {
            setFeedbackPopup(false)
            setIsEditing(false)
            setEditFeedbackId(null)
          }}
          handleFeedbackSubmit={isEditing ? handleUpdate : () => {}}
          submitBtnText={isEditing ? 'Update' : 'Submit'}
        />
      )}
    </div>
  )
}

export default Feedbacks
