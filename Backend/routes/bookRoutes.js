const controller = require('../controllers/bookController.js')
const verifyToken = require('../verifyToken.js')

const express = require('express')
const router = express.Router()


//For details about the possible requests see the README file

router.route('/').get(controller.getAllBooks)

router.route('/:id')
    .get(controller.getBookById)
    .put(verifyToken, controller.updateBook)
    .delete(verifyToken, controller.deleteBook)

router.route('/create').post(verifyToken, controller.createBook)

module.exports = router