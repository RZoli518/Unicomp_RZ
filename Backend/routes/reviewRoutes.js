const controller = require('../controllers/reviewController.js')
const express = require('express')
const router = express.Router()

//For details about the possible requests see the README file

router.route('/').get(controller.getAllReviews)

router.route('/:id')
    .get(controller.getReviewById)
    .put(controller.updateReview)
    .delete(controller.deleteReview)

router.route('/book/:id').get(controller.getReviewsByBookId)
router.route('/author/:id').get(controller.getReviewsByAuthorId)

router.route('/create').post(controller.createReview)

module.exports = router