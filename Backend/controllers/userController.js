const service = require('../services/userService.js')
const User = require('../models/user.js')
const { default: mongoose } = require('mongoose')

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
        req.body = {_id: '10', name: 'direct approach', email: 'direct22222@gmail.com', password: 'direct22222', username: 'direct22222'}
        const { _id, name, email, password, username } = req.body
        const newUser = new User({_id, name, email, password, username})
        await service.createNewUser(newUser)
        res.status(200).send('New user created')
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
        const updateUser = await service.updateUser(req.params.id, req.body)
        if(updateUser){
            res.status(200).send('successfully updated user', req.params.id)
        }
        else{
            res.status(500).send('failed to update user')
        }
    }
    catch(e){
        res.status(500).send(e)
    }
}