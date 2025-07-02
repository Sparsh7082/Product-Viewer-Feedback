import React from 'react'

const FeedbackForm = ({feedback, setFeedback, products, onCancel, handleFeedbackSubmit, submitBtnText}) => {

    const handleFeedbackChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value })
    }

  return (
    <div>
      {/* Feedback Form */}
        <div className='fixed inset-0 backdrop-blur-sm bg-black/30 bg-opacity-50 flex justify-center items-center z-50'>
          <div className='bg-white rounded-md p-6 w-[400px] relative'>
            <h2 className='text-xl font-bold mb-4'>Submit Feedback</h2>

            <div className='mb-3'>
              <label className='block font-semibold'>Product:</label>
              <select
                name="productId"
                value={feedback.productId}
                onChange={handleFeedbackChange}
                className='w-full border p-2 rounded'
              >
                <option value="">Select a product</option>
                {products.map(product => (
                  <option key={product.id} value={product.id}>{product.title}</option>
                ))}
              </select>
            </div>

            <div className='mb-3'>
              <label className='block font-semibold'>Title:</label>
              <input
                type='text'
                name='title'
                value={feedback.title}
                onChange={handleFeedbackChange}
                className='w-full border p-2 rounded'
              />
            </div>

            <div className='mb-4'>
              <label className='block font-semibold'>Description:</label>
              <textarea
                name='description'
                rows='4'
                value={feedback.description}
                onChange={handleFeedbackChange}
                className='w-full border p-2 rounded'
              ></textarea>
            </div>

            <div className='flex justify-end space-x-2'>
              <button onClick={onCancel} className='bg-gray-400 px-4 py-2 rounded'>Cancel</button>
              <button onClick={handleFeedbackSubmit} className='bg-blue-500 text-white px-4 py-2 rounded'>{submitBtnText}</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default FeedbackForm
