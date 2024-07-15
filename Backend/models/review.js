const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        unique: true,
    },
    summary: {
        type: String,
        required: true,
    },
    text: {
        type:String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    authorid: {
        type: String,
        required: true,
    },
    bookid: {
        type: String,
        required: true
    },
})

const Review = mongoose.model('Review', reviewSchema)
module.exports = Review