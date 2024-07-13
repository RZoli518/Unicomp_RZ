const { getAllBooks } = require('../services/bookService.js')
const { getBookById } = require('../services/bookService.js')
const { createBook } = require('../services/bookService.js')
const { deleteBook } = require('../services/bookService.js')

module.exports = () => {
    getAllBooks: async (req, res) => {
        try{
            const Books = await getAllBooks()
            req.json(Books)
        }
        catch(e){
            res.status(500).send(e)
        }
    }

    getBookById: async (req, res) => {
        try{
            const BookId = req.params.BookId
            const Book = await getBookById(BookId)
            res.json(Book)
        }
        catch(e){
            res.status(500).send(e)
        }
    }
}