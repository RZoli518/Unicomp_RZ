const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const verifyToken = require('../verifyToken.js')
const service = require('../services/userService.js')
const User = require('../models/user.js')

//Returns all users in the database
exports.getAllUsers = async (req, res) => {
    try{
        const users = await service.getAllUsers()
        res.status(200).json(users)
    }
    catch(e) {
        res.status(500).send(e)
    }
}

//Returns all data about a user based on the provided ID
exports.getUserById = async (req, res) => {
    if(req.params.id.length != 24){                 //checking if the provided id can be valid for the ObjectID based database
        res.status(400).send({ responseMessage:'User query failed', responseError: 'Invalid id' })
    }
    else{
        try{
            const userById = await service.getUserById(req.params.id)
            if(!userById){
                res.status(404).send({ responseMessage: 'User not found', responseError: 'User not found'})
            }
            else{
                res.status(200).json(userById)
            }
        }
        catch(e) {
            res.status(500).send(e)
        }
    }
}

//Returns all data about a user based on the provided username
exports.getUserByUsername = async (req, res) => {
    try{
        const userByUsername = await service.getUserByUsername(req.params.username)
        if(!userByUsername){
            res.status(404).send({ responseMessage: 'User not found', responseError: 'User not found'})
        }
        else{
            res.status(200).json(userByUsername)
        }
    }
    catch(e) {
        res.status(500).send(e)
    }
}

//Creates a new user using the data from the request body. ID is generated automatically
exports.createUser = async (req, res) => {
    try{
        hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            username: req.body.username
        })
        await service.createNewUser(newUser)
        res.status(200).send({ responseMessage: 'Created new user' })
    }
    catch(e){
        console.log(e)
        res.status(500).send({ responseMessage: 'Failed to create new user' })
    }
}

//Deletes the user belonging to the provided id
exports.deleteUser = async (req, res) => {
    if(req.params.id.length != 24){                 //checking if the provided id can be valid for the ObjectID based database
        res.status(400).send({ responseMessage:'Deleting user failed', responseError: 'Invalid id' })
    }
    else{
        try{
            await service.deleteUser(req.params.id)
            res.status(200).send({ responseMessage: 'User deleted' })
        }
        catch(e){
            res.status(500).send(e)
        }
    }
}

//Updates a user based on the data provided in the request body.
exports.updateUser = async (req, res) => {
    if(req.params.id.length != 24){                 //checking if the provided id can be valid for the ObjectID based database
        res.status(400).send({ responseMessage:'User update failed', responseError: 'Invalid id' })
    }
    else{
        try{
            if(req.body.password)
            {
                req.body.password = await bcrypt.hash(req.body.password, 10)
            }
            const updatedUser = new User({
                _id: req.params.id,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                username: req.body.username
            })

            await service.updateUser(updatedUser)

            res.status(200).send({ responseMessage: 'User updated' })
        }
        catch(e){
            res.status(500).send({ responseMessage: 'User update failed' })
        }
    }
}

exports.login = async (req, res) => {
    try{
        const { username, password } = req.body

        const user = await service.getUserByUsername(username)
        if(!user){
            return res.status(404).send({ responseMessage: 'Authentication failed!', responseError: 'User not found' })
        }
        const passwordCheck = await bcrypt.compare(password, user.password)
        if(!passwordCheck){
            return res.status(401).send({ responseMessage: 'Authentication failed!', responseError: 'Wrong passord' })
        }

        const accessToken = jwt.sign({ username: user.username }, process.env.SECRETKEY, {expiresIn: '6h'})
        res.status(200).send({ responseMessage: 'Login succesful', username: user.username, email: user.email, name: user.name, accessToken: accessToken })
    }
    catch(e){
        res.status(500).send({ responseMessage: 'Login failed' })
    }
}