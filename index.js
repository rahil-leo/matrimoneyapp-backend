require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const fileUpload = require('express-fileupload');

const authRoutes = require('./routes/authRoutes')
const homeroute = require('./routes/homeroute')
const app = express()

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}))
app.use(cors({ origin: 'http://localhost:5173', credentials: true })) 

app.use(express.json())
app.use(cookieParser())
const { connectDB } = require('./config/db')
connectDB()

const { ConnectCloudinary } = require('./config/cloudinary')
ConnectCloudinary()

app.use('/auth', authRoutes)
app.use('/',homeroute)

app.listen(3000, () => {
    console.log('server running on port 3000')
})

