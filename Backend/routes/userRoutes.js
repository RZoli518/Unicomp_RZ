const controller = require('./controller.js')
const router = require('express').Router()

module.exports = () => {
    router.get('/', controller.getAllUsers)
    router.get('/:id', controller.getUserById)
    router.post('/', controller.createUser)
    router.delete('/:id', controller.deleteUser)
}