const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const {mongoose} = require('mongoose')

mongoose.connect()

const app = express()

app.use('/',require('./routes/authRoutes'))

const port = 8000
app.listen(port,()=> console.log('Server is running'))
