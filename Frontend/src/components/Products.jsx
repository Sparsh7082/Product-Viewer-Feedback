import React, { useEffect, useState } from 'react'
import Rating from './productComponents/Rating'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import FeedbackForm from './FeedbackForm'
import Navbar from './Navbar'

const Products = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    const [products, setProducts] = useState([])
    
    const [currentPage, setCurrentPage] = useState(1)
    const productsPerPage = 8

    const [feedbackPopup, setFeedbackPopup] = useState(false)
    const [feedback, setFeedback] = useState({
      productId: '',
      title: '',
      description:''
    })

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
    
    const lastProductIndex = currentPage * productsPerPage
    const firstProductIndex = lastProductIndex - productsPerPage
    const currentProducts = products.slice(firstProductIndex, lastProductIndex)
    const totalPages = Math.ceil(products.length / productsPerPage)

    const prev = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage-1)
      } else {
        setCurrentPage(1)
      }
    }

    const next = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage+1)
      } else {
        setCurrentPage(totalPages)
      }
    }

    const handleFeedbackChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value })
  }

  const handleFeedbackSubmit = async() => {
    console.log("Submitted Feedback:", feedback)
    if(!feedback.productId || !feedback.title || !feedback.description){
      alert('require all field')
    } else{
      alert("Feedback submitted!")
    }
    try {
      await axios.post('http://localhost:8080/api/feedback/create-feedback',feedback,{headers: {authorization: `Bearer ${token}`}})
      setFeedbackPopup(false)
      setFeedback({ productId: '', title: '', description: '' })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {/* <h1 className='text-center text-2xl font-bold'>Products</h1> */}
      <Navbar heading='Products'/>

      <div className='grid grid-cols-4'>
      {
        currentProducts && currentProducts.map((product)=>(
          <div key={product.id} className='grid grid-cols-2 border border-black m-5 rounded-md'>
            <div>
              <img src={product.images[0]} width='150px' />
              <h2 className='text-lg text-center border rounded-md'><Rating rating={product.rating}/></h2>
            </div>
            <div className='grid grid-rows-2'>
              <h1 className='font-bold text-xl'>{product.title}</h1>
              <h2 className='text-lg'>$ {product.price}</h2>
            </div>
          </div>
        ))
      }
      </div>

      {/* Pagination */}
      <div className='grid grid-cols-3 text-center mx-20 text-xl font-bold'>
        <button onClick={prev} className='border rounded-md mx-20 bg-red-300'> &lt;&lt; Prev</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={next} className='border rounded-md mx-20 bg-green-300'>Next &gt;&gt;</button>
      </div>

      <div className='text-center text-white text-xl mt-10 mx-150 bg-blue-600 font-bold rounded-md p-2'>
        <button onClick={()=>setFeedbackPopup(true)}>Write a feedback</button>
      </div>
      
      {feedbackPopup && <FeedbackForm
      feedback={feedback}
      setFeedback={setFeedback}
      products={products}
      onCancel={()=>setFeedbackPopup(false)}
      handleFeedbackSubmit={handleFeedbackSubmit}
      submitBtnText='Submit'
      />}
      <div className='text-center text-xl'>
        <button onClick={()=>navigate('/feedbacks')}>View all Feedbacks</button>
      </div>
      
    </div>
  )
}

export default Products
