const mongoose = require('mongoose')

const User = require('../models/user.js')

const uri = 'mongodb+srv://reviczkyzoli:mongodb@unicompbooks.jclx9sy.mongodb.net/bookreviews'


exports.getAllUsers = async () => {
    mongoose.connect(uri)

    const result = await User.find({})

    mongoose.connection.close()
    return result
}

exports.getUserById = async (id) => {
    mongoose.connect(uri)

    const result = await User.findOne({_id: id})

    mongoose.connection.close()
    return result
}

exports.createNewUser = async (user) => {
    mongoose.connect(uri)

    await user.save()

    if(user == await User.findOne({_id: user.id}))
    {
        mongoose.connection.close()
        return true
    }
    else{
        mongoose.connection.close()
        return false
    }
}

exports.deleteUser = async (id) => {
    mongoose.connect(uri)
    await User.deleteOne({_id: id})
    mongoose.connection.close()
}

exports.updateUser = async (user) => {
    mongoose.connect(uri)
    await User.updateOne({_id: user.id}, {name: user.name, email: user.email, password: user.password, username: user.username})
    if(user == await User.findOne({_id: user.id}))
    {
        return true
    }
    else{
        return false
    }
}