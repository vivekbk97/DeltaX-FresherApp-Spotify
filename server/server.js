const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const songRoutes = require('./routes/songRoutes')
const artistRoutes = require('./routes/artistRoutes')

const PORT = process.env.PORT || 5000

dotenv.config()
connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/user', userRoutes)
app.use('/song', songRoutes)
app.use('/artist', artistRoutes)

// ---------- deploy ---------
const _dirname1 = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(_dirname1, '/client/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(_dirname1, 'client', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running')
  })
}
// ---------- deploy ---------

const server = app.listen(
  PORT,
  console.log(`Server listening at http://localhost:${PORT}`)
)
