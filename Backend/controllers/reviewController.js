const { getAllReviews } = require('../services/reviewService.js')
const { getReviewById } = require('../services/reviewService.js')
const { createReview } = require('../services/reviewService.js')
const { deleteReview } = require('../services/reviewService.js')

module.exports = () => {
    getAllReviews: async (req, res) => {
        try{
            const Reviews = await getAllReviews()
            req.json(Reviews)
        }
        catch(e){
            res.status(500).send(e)
        }
    }

    getReviewById: async (req, res) => {
        try{
            const ReviewId = req.params.ReviewId
            const Review = await getReviewById(ReviewId)
            res.json(Review)
        }
        catch(e){
            res.status(500).send(e)
        }
    }
}