const service = require('../services/reviewService.js')
const bookservice = require('../services/bookService.js')

const Review = require('../models/review.js')
const Book = require('../models/book.js')

//Returns all reviews in the database
exports.getAllReviews = async (req, res) => {
    try{
        const reviews = await service.getAllReviews()
        res.status(200).json(reviews)
    }
    catch(e) {
        res.status(500).send(e)
    }
}

//Returns a review based on the provided ID
exports.getReviewById = async (req, res) => {
    if(req.params.id.length != 24){                 //checking if the provided id can be valid for the ObjectID based database
        res.status(400).send("Invalid Id provided")
    }
    else{
        try{
            const reviewById = await service.getReviewById(req.params.id)
            console.log(reviewById)
            if(reviewById){
                res.status(200).json(reviewById)
            }
            else{
                console.log(reviewById)
                res.status(404).send('No review found by the given id ' + req.params.id)
            }
        }
        catch(e) {
            res.status(500).send(e)
        }
    }
}

//Creates a new review based on the request body. ID is generated automatically
exports.createReview = async (req, res) => {
    try{
        const newReview = new Review({
            summary: req.body.summary,
            text: req.body.text,
            score: req.body.score,
            authorid: req.body.authorid,
            bookid: req.body.bookid
        })
        const validated = await validReview(newReview)
        if(validated){
            return res.status(400).send(validated)
        }

        await service.createNewReview(newReview)

        bookScoreUpdate(req.body.bookid)

        res.status(200).send("Created new review")
    }
    catch(e){
        res.status(500).send(e)
    }
}

//Deletes a review belonging to the provided id
exports.deleteReview = async (req, res) => {
    if(req.params.id.length != 24){                 //checking if the provided id can be valid for the ObjectID based database
        res.status(400).send("Invalid Id provided")
    }
    else{
        try{
            const review = await service.getReviewById(req.params.id)

            await service.deleteReview(req.params.id)

            bookScoreUpdate(review.bookid)

            res.status(200).send("Review deleted")
        }
        catch(e){
            res.status(500).send(e)
        }
    }
}

//Updates a review based on the requesdt body. Any of the parameters can be null
exports.updateReview = async (req, res) => {
    if(req.params.id.length != 24){                 //checking if the provided id can be valid for the ObjectID based database
        res.status(400).send("Invalid Id provided")
    }
    else{
        try{
            const updatedReview = new Review({
                _id: req.params.id,
                summary: req.body.summary,
                text: req.body.text,
                score: req.body.score,
                authorid: req.body.authorid,
                bookid: req.body.bookid
            })

            const validated = await validReview(updatedReview)
            if(validated){
                return res.status(400).send(validated)
            }

            await service.updateReview(updatedReview)

            const review = await service.getReviewById(updatedReview._id)

            bookScoreUpdate(review.bookid)

            res.status(200).send("Review updated")
        }
        catch(e){
            res.status(500).send(e)
        }
    }
}

//returns all reviews written about a book
exports.getReviewsByBookId = async (req, res) => {
    if(req.params.id.length != 24){                 //checking if the provided id can be valid for the ObjectID based database
        res.status(400).send("Invalid Id provided")
    }
    else{
        try{
            const bookReviews = await service.getReviewsByBookId(req.params.id)
            res.status(200).json(bookReviews)
        }
        catch(e){
            res.status(500).send(e)
        }
    }
} 

//Returns all reviews written by a user
exports.getReviewsByAuthorId = async (req, res) => {
    if(req.params.id.length != 24){                 //checking if the provided id can be valid for the ObjectID based database
        res.status(400).send("Invalid Id provided")
    }
    else{
        try{
            const authorReviews = await service.getReviewsByAuthorId(req.params.id)
            res.status(200).json(authorReviews)
        }
        catch(e){
            res.status(500).send(e)
        }
    }
} 

//After any update happens to a review (create, delete, update) 
//this function calculates the new average rating of the book the review was created about
async function bookScoreUpdate(id){
    const scores = await service.getReviewsByBookId(id)
    if(scores.length > 1){
        var total = 0
        var count = 0
        scores.forEach((element) => {
            total += element.score
            count++
        })
        const bookAvg = new Book({
            _id: id,
            rating: (total/count).toFixed(1)
        })
        await bookservice.updateBook(bookAvg)
    }
    else if(scores.length = 1){
        const bookAvg = new Book({
            _id: id,
            rating: scores[1].score
        })
        await bookservice.updateBook(bookAvg)
    }
    else{
        const bookAvg = new Book({
            _id: id,
            rating: 0
        })
        await bookservice.updateBook(bookAvg)
    }
}

function validReview(review) {
    if(review.summary){
        let size = review.summary.length
        switch(size){
            case size > 100:
                return { responseMessage: 'Invalid text length', responseError: 'Summary too long'}
            case site < 20:
                return { responseMessage: 'Invalid text length', responseError: 'Summary too short'}
        }
    }

    if(review.text){
        let size = review.text.length
        switch(size){
            case size > 2000:
                return { responseMessage: 'Invalid text length', responseError: 'Text too long'}
            case site < 250:
                return { responseMessage: 'Invalid text length', responseError: 'Text too short'}
        }
    }
    
    if(review.score && (review.score > 5 || review.score < 1)){
        return { responseMessage: 'Score must be between 1 and 5', responseError: 'Invalid rating'}
    }

    return null
}