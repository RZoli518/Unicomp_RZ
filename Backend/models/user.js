const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        unique: true,
    },
    name: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    username: {
        type: String,
        unique: true,
    },
})

const User = mongoose.model('users', userSchema)
module.exports = User