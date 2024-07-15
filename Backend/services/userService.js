const mongoose = require('mongoose')

const User = require('../models/user.js')

const uri = 'mongodb+srv://reviczkyzoli:mongodb@unicompbooks.jclx9sy.mongodb.net/bookreviews'


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

exports.createNewUser = async (user) => {
    await mongoose.connect(uri)

    await user.save()

    if(user == await User.findOne({email: user.email}))
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
    await mongoose.connect(uri)
    await User.deleteOne({_id: id})
    mongoose.connection.close()
}

exports.updateUser = async (id, user) => {
    await mongoose.connect(uri)
    await User.updateOne({_id: id}, {name: user.name, email: user.email, password: user.password, username: user.username})
    if(user == await User.findOne({email: user.email}))
    {
        return true
    }
    else{
        return false
    }
}