const controller = require('../controllers/reviewController.js')
const router = require('express').Router()

module.exports = () => {
    router.get('/', controller.getAllReviews)
    router.get('/:id', controller.getReviewById)
    router.post('/', controller.createReview)
    router.delete('/:id', controller.deleteReview)
}