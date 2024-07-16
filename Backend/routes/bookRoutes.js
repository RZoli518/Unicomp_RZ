const controller = require('../controllers/bookController.js')
const express = require('express')
const router = express.Router()

//For details about the possible requests see the README file

router.route('/').get(controller.getAllBooks)

router.route('/:id')
    .get(controller.getBookById)
    .put(controller.updateBook)
    .delete(controller.deleteBook)

router.route('/create').post(controller.createBook)

module.exports = router