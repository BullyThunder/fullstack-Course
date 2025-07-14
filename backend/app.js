require('dotenv').config()
const path = require('path')
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')

const notesRouter = require('./routes/notes')
const personsRouter = require('./routes/persons')
const logger = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(logger)

// Подключение к MongoDB
const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.error('error connecting to MongoDB:', error.message)
  })

// Роуты
app.use('/api/notes', notesRouter)
app.use('/api/persons', personsRouter)

// Статические файлы для фронтенда
app.use(express.static(path.join(__dirname, 'dist')))

// Все остальные маршруты отдаём index.html (SPA)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})
app.use(errorHandler);
module.exports = app
