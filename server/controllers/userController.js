const userModel = require('../models/user.model')

exports.getAllUsers = async (req, res) => {
    const users = await userModel.find()
    res.json(users)
}

exports.createUser = async (req, res) => {
    const user = await userModel.create(req.body)
    res.json(user)
}

