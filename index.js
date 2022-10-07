const express = require('express')
const mongoose = require('mongoose')

const apiRouter = require('./routes/api.controller')
const authRouter = require('./routes/auth.controller')

require('dotenv').config()

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qavoc.mongodb.net/?retryWrites=true&w=majority`)

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.use('/api', apiRouter)
app.use('/auth', authRouter)

app.listen(port, () => {
  console.log(`Server on port ${port}`)
})
