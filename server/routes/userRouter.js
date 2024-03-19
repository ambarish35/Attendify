const express = require('express')
const userRouter = express.Router()
const { getAllUsers, createUser } = require('../controllers/userController')

userRouter.get('/getAllUsers', getAllUsers)
    .post('/createUser', createUser)

module.exports = userRouter
