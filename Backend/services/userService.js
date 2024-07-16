const mongoose = require('mongoose')

const User = require('../models/user.js')

const uri = process.env.MONGO_URI


exports.getAllUsers = async () => {
    await mongoose.connect(uri)

    const result = await User.find({})

    mongoose.connection.close()
    return result
}

exports.getUserById = async (id) => {
    await mongoose.connect(uri)

    const result = await User.findOne({_id: id})

    mongoose.connection.close()
    return result
}

exports.getUserByUsername = async (username) => {
    await mongoose.connect(uri)

    const result = await User.findOne({username: username})

    mongoose.connection.close()
    return result
}

exports.createNewUser = async (user) => {
    await mongoose.connect(uri)

    await user.save()

    mongoose.connection.close()
}

exports.deleteUser = async (id) => {
    await mongoose.connect(uri)
    await User.deleteOne({_id: id})

    mongoose.connection.close()
}


//TODO: Usernek update
exports.updateUser = async (user) => {
    await mongoose.connect(uri)
    await User.updateOne({_id: user._id}, {name: user.name, email: user.email, password: user.password, username: user.username})

    mongoose.connection.close()
}