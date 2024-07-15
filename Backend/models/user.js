const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    _id: String,
    name: String,
    email: String,
    password: String,
    username: String,
})

const User = mongoose.model('users', userSchema)
module.exports = User