const controller = require('../controllers/userController.js')
const express = require('express')
const router = express.Router()

//For details about the possible requests see the README file

router.route('/').get(controller.getAllUsers)

router.route('/:id')
    .get(controller.getUserById)
    .put(controller.updateUser)
    .delete(controller.deleteUser)

router.route('/username/:username').get(controller.getUserByUsername)

router.route('/create').post(controller.createUser)

module.exports = router