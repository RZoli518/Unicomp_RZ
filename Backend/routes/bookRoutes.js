const controller = require('../controllers/bookController.js')
const router = require('express').Router()

module.exports = () => {
    router.get('/', controller.getAllBooks)
    router.get('/:id', controller.getBookById)
    router.post('/', controller.createBook)
    router.delete('/:id', controller.deleteBook)
}