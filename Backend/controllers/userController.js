const service = require('../services/userService.js')
const User = require('../models/user.js')

//Returns all users in the database
exports.getAllUsers = async (req, res) => {
    try{
        const users = await service.getAllUsers()
        res.status(200).json(users)
    }
    catch(e) {
        console.log(e)
        res.status(500).send(e)
    }
}

//Returns all data about a user based on the provided ID
exports.getUserById = async (req, res) => {
    if(req.params.id.length != 24){                 //checking if the provided id can be valid for the ObjectID based database
        res.status(400).send("Invalid Id provided")
    }
    else{
        try{
            const userById = await service.getUserById(req.params.id)
            res.status(200).json(userById)
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
        res.status(200).json(userByUsername)
    }
    catch(e) {
        res.status(500).send(e)
    }
}

//Creates a new user using the data from the request body. ID is generated automatically
exports.createUser = async (req, res) => {
    console.log(req.body)
    try{
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            username: req.body.username
        })
        await service.createNewUser(newUser)
        res.status(200).send("Created new user")
    }
    catch(e){
        res.status(500).send(e)
    }
}

//Deletes the user belonging to the provided id
exports.deleteUser = async (req, res) => {
    if(req.params.id.length != 24){                 //checking if the provided id can be valid for the ObjectID based database
        res.status(400).send("Invalid Id provided")
    }
    else{
        try{
            await service.deleteUser(req.params.id)
            res.status(200).send("User deleted")
        }
        catch(e){
            res.status(500).send(e)
        }
    }
}

//Updates a user based on the data provided in the request body.
exports.updateUser = async (req, res) => {
    if(req.params.id.length != 24){                 //checking if the provided id can be valid for the ObjectID based database
        res.status(400).send("Invalid Id provided")
    }
    else{
        try{
            const updatedUser = new User({
                _id: req.params.id,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                username: req.body.username
            })

            await service.updateUser(updatedUser)

            res.status(200).send("User updated")
        }
        catch(e){
            res.status(500).send(e)
        }
    }
}