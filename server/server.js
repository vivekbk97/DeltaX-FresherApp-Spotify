const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
const connectDB = require('./config/db')

const PORT = process.env.PORT || 5000

dotenv.config()
connectDB()

const app = express()

app.use(cors())
app.use(express.json())

const server = app.listen(
  PORT,
  console.log(`Server listening at http://localhost:${PORT}`)
)
