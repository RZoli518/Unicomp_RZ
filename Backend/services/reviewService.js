const mongoose = require('mongoose')

const Review = require('../models/review.js')

const uri = process.env.MONGO_URI


exports.getAllReviews = async () => {
    await mongoose.connect(uri)

    const result = await Review.find({})

    mongoose.connection.close()
    return result
}

exports.getReviewById = async (id) => {
    await mongoose.connect(uri)

    const result = await Review.findOne({_id: id})

    mongoose.connection.close()
    return result
}

exports.createNewReview = async (review) => {
    await mongoose.connect(uri)

    await review.save()

    mongoose.connection.close()
}

exports.deleteReview = async (id) => {
    await mongoose.connect(uri)
    await Review.deleteOne({_id: id})

    mongoose.connection.close()
}

exports.updateReview = async (review) => {
    await mongoose.connect(uri)
    await Review.findOneAndUpdate({_id: review._id}, {summary: review.summary, text: review.text, score: review.score, authorid: review.authorid, bookid: review.bookid})

    mongoose.connection.close()
}

exports.getReviewsByBookId = async (id) => {
    await mongoose.connect(uri)

    const result = await Review.find({bookid: id})

    mongoose.connection.close()
    return result
}

exports.getReviewsByAuthorId = async (id) => {
    await mongoose.connect(uri)

    const result = await Review.find({authorid: id})

    mongoose.connection.close()
    return result
}