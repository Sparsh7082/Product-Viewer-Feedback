const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    productId: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model('Feedback',feedbackSchema)