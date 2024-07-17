const controller = require('../controllers/userController.js')
const verifyToken = require('../verifyToken.js')

const express = require('express')
const router = express.Router()

//For details about the possible requests see the README file

router.route('/').get(controller.getAllUsers)

router.route('/id/:id')
    .get(controller.getUserById)
    .put(verifyToken, controller.updateUser)
    .delete(verifyToken, controller.deleteUser)

router.route('/username/:username').get(controller.getUserByUsername)

router.route('/create').post(controller.createUser)

router.route('/login').post(controller.login)

module.exports = router