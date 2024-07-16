const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
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

const Review = mongoose.model('reviews', reviewSchema)
module.exports = Review