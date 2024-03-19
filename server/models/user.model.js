const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    roll: {
        unique: true,
        type: Number,
        required: true
    },
    descriptor: {
        required: true,
        type: [Object]
    },
    image: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('User', userSchema)