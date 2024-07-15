const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    author: {
        type: String,
        required: true,
    },
    average: {
        type: Number,
        required: true,
    }
})

const Book = mongoose.model('Bool', bookSchema)
module.exports = Book

