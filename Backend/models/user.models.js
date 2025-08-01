const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        unique: true,
        required: true
        
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},{timestamps: true})


module.exports = mongoose.model('User',userSchema)
