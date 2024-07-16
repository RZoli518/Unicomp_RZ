const service = require('../services/bookService.js')
const Book = require('../models/book.js')

//Returns all books in the database
exports.getAllBooks = async (req, res) => {
    try{
        const books = await service.getAllBooks()
        res.status(200).json(books)
    }
    catch(e) {
        res.status(500).send(e)
    }
}

//Finds and returns a specific book based on it's ID
exports.getBookById = async (req, res) => {
    if(req.params.id.length != 24){                 //checking if the provided id can be valid for the ObjectID based database
        res.status(400).send("Invalid Id provided")
    }
    else{
        try{
            const bookById = await service.getBookById(req.params.id)
            res.status(200).json(bookById)
        }
        catch(e) {
            res.status(500).send(e)
        }
    }
}

//Creates a new book based on the request body. ID is generated automatically
exports.createBook = async (req, res) => {
    console.log(req.body)
    try{
        const newBook = new Book({
            title: req.body.title,
            author: req.body.author,
            rating: req.body.rating,
            description: req.body.description
        })
        await service.createNewBook(newBook)
        res.status(200).send("Created new book")
    }
    catch(e){
        res.status(500).send(e)
    }
}

//Deletes a book based on the provided ID
exports.deleteBook = async (req, res) => {
    if(req.params.id.length != 24){                 //checking if the provided id can be valid for the ObjectID based database
        res.status(400).send("Invalid Id provided")
    }
    else{
        try{
            await service.deleteBook(req.params.id)
            res.status(200).send("Book deleted")
        }
        catch(e){
            res.status(500).send(e)
        }
    }
}

//Updates a book based on the received ID and parameters. Any parameter can be null
exports.updateBook = async (req, res) => {
    if(req.params.id.length != 24){                 //checking if the provided id can be valid for the ObjectID based database
        res.status(400).send("Invalid Id provided")
    }
    else{
        try{
            const updatedBook = new Book({
                _id: req.params.id,
                title: req.body.title,
                author: req.body.author,
                rating: req.body.rating,
                description: req.body.description
            })

            await service.updateBook(updatedBook)

            res.status(200).send("Book updated")
        }
        catch(e){
            res.status(500).send(e)
        }
    }
}