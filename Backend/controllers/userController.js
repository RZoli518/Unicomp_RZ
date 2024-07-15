const service = require('../services/userService.js')
const User = require('../models/user.js')

//TODO: Request data from database

exports.getAllUsers = async (req, res) => {
    try{
        const users = await service.getAllUsers()
        res.status(200).json(users)
    }
    catch(e) {
        res.status(500).send(e)
    }
}

exports.getUserById = async (req, res) => {
    try{
        const userById = await service.getUserById(req.params.id)
        res.status(200).json(userById)
    }
    catch(e) {
        res.status(500).send(e)
    }
}

exports.createUser = async (req, res) => {
    try{
        res.status(200).send('successful registration of user', req.params.id)
    }
    catch(e){
        res.status(500).send(e)
    }
}

exports.deleteUser = async (req, res) => {
    try{
        await service.deleteUser(req.params.id)
        res.status(200).send('successfully deleted user', req.params.id)
    }
    catch(e){
        res.status(500).send(e)
    }
}

exports.updateUser = async (req, res) => {
    try{
        res.status(200).send('successfully updated user', req.params.id)
    }
    catch(e){
        res.status(500).send(e)
    }
}