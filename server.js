const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const userRouter = require('./routes/user.router')
const intersectRouter = require('./routes/intersection.router')

require('dotenv').config()

const PORT = process.env.PORT || 5001
const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI)

// middlewares
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: false }))

app.use('/api/v1/user', userRouter)
app.use('/api/v1/intersection', intersectRouter)

app.use((req, res, next) => {
    res.status(404).send(
        '<h1>Page not found on the server</h1>')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
