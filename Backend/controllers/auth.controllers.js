const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User  = require('../models/user.models')
const {SECRET_KEY} = require('../config/config')
const validator = require('validator')


// register function
exports.register = async (req,res) => {
    const {name, phoneNumber, email, password} = req.body

    // check existing user
    const existingUser = await User.findOne({ $or: [{ email }, { phoneNumber }] })
    if(existingUser){
        return res.status(400).json({
            success: false,
            message: 'User already exist'
        })
    }

    // validate email
    if(! validator.isEmail(email)){
        return res.status(400).json({
            success: false,
            message: 'please enter valid email'
        })
    }

    // validate phone number
    if (!validator.isMobilePhone(phoneNumber, 'en-IN')) {
        return res.status(400).json({
            success: false,
            message: 'Please enter a valid phone number'
        })
    }

    // hashing the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // creating a new user
    const newUser = {name, phoneNumber, email, password: hashedPassword}

    // creating user
    const user = await User.create(newUser)

    // generating token
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email
        }, SECRET_KEY)
   
    // response
    res.status(201).json({ 
        success: true,
        message: "user registered successfully",
        token
    })
}


// ----------------------------------------------------------------------------


// login function
exports.login = async (req, res) => {
    const {email, password} = req.body

    // find user
    const user = await User.findOne({email})
    if(!user){
        return res.status(400).json({
           success: false,
           message: "user not found"
       })
   }

    // check password
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        return res.status(400).json({
            success: false,
            message: "password incorrect"
        })
    }

    // generating token
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email
        }, SECRET_KEY)

    // response
    res.status(200).json({ 
        success: true,
        message: "user logged in successfully",
        token
    })
}
