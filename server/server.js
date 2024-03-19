const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
const userRouter = require('./routes/userRouter')
require('dotenv').config()
const server = express()


//Middlewares
server.use(express.json())
server.use(cors())
server.use("/", userRouter)


//Database connection
try {
    mongoose.connect("mongodb://localhost:27017/face_recognition")
    console.log("Database Connected")
} catch (e) {
    console.log(e)
}


server.listen(process.env.PORT || 8000, (req, res) => {
    console.log(`Server started at ${process.env.PORT || 8080}`)
})
