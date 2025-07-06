const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/auth.routes')
const feedbackRoutes = require('./routes/feedback.routes')
const userRoutes = require('./routes/user.routes')
require('dotenv').config()

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('db connected')}).catch((error) => console.log(error))

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/auth',authRoutes)
app.use('/api/feedback',feedbackRoutes)
app.use('/api/user',userRoutes)

app.listen(process.env.PORT, () => console.log('server running at 8080'))
