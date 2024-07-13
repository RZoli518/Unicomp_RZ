const controller = require('../controllers/userController.js')
const router = require('express').Router()

router.get('/', (req, res) => {
    controller.getAllUsers()
})

router.get('/:id', (req, res) => {
    controller.getUserById(req, res)
})

router.post('/', (req, res) => {
    controller.createUser(req, res)
})

router.delete('/:id', (req, res) => {
    controller.deleteUser(req, res)
})

module.exports = router