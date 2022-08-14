require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const router = require('./router/index')

const PORT = process.env.PORT || 5000
const DB_URL = process.env.DB_URL

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api', router)

const start = async () => {
    try {
        // db
        mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Соединение с базой данных установлено')

        // const db = mongoose.db('Auth')
        // const result = await db.command({ ping: 1 })
        // console.log(result)

        // server
        app.listen(PORT, () => {
            console.log(`Server started on PORT = ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()
