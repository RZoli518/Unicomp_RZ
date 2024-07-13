const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    summary: {
        type: String,
        required: true,
        unique: true,
    },
    text: {
        type:String,
        required: true,
        unique: true,
    },
    author: {
        type: String,
        required: true
    },
})

const Review = mongoose.model('Review', reviewSchema)
module.exports = Review