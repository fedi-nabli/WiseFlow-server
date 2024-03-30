import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'

dotenv.config()
connectDB()
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('NODE REST API is running...')
})

const PORT = process.env.PORT || 5001
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))