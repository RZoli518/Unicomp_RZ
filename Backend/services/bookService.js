const mongoose = require('mongoose')

const Book = require('../models/book.js')

const uri = process.env.MONGO_URI


exports.getAllBooks = async () => {
    await mongoose.connect(uri)

    const result = await Book.find({})

    mongoose.connection.close()
    return result
}

exports.getBookById = async (id) => {
    await mongoose.connect(uri)

    const result = await Book.findOne({_id: id})

    mongoose.connection.close()
    return result
}

exports.createNewBook = async (book) => {
    await mongoose.connect(uri)

    await book.save()

    mongoose.connection.close()
}

exports.deleteBook = async (id) => {
    await mongoose.connect(uri)
    await Book.deleteOne({_id: id})

    mongoose.connection.close()
}

exports.updateBook = async (book) => {
    await mongoose.connect(uri)
    await Book.updateOne({_id: book._id}, {title: book.title, author: book.author, rating: book.rating, description: book.description})

    mongoose.connection.close()
}