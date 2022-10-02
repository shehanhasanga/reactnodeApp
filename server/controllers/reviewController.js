
const {
    logger
} = require('../config/logger/log4js.init');

const ReviewService =  require("../services/reviewService")
const reviewService = new ReviewService()

const sendErrorResponse = (error, res) => {
    if(error.statusCode){
        return res.status(e.statusCode).json({ error: e.message });
    } else {
        return res.status(e.statusCode).json({ error: e.message });
    }
}

exports.addReview = async function (req, res, next) {
    const userId = req.user.id;
    const productId = req.body.product;
    try{
        let data =  await reviewService.addReview(req.body, userId, productId)
        res.status(200).json({
            success: true,
            message: `Your review has been added successfully and will appear when approved!`,
            review: data
        });
    }catch (e) {
        return res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }

}

exports.getAllReviews = async function (req, res, next) {
    const { page = 1, limit = 10 } = req.query;
    let pageLimit = parseInt(limit)
    let pageStart = (page - 1) * limit
    try {
        let {reviews, count} = await reviewService.getAllReviews(pageStart, pageLimit)
        res.status(200).json({
            reviews,
            totalPages: Math.ceil(count / limit),
            currentPage: Number(page),
            count
        });
    }catch (e) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

exports.getReview = async function (req, res, next) {
    const addressId = req.params.slug ;
    try {
        let reviews = await reviewService.getReview(addressId)
        res.status(200).json({
            reviews
        });
    }catch (e) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}


exports.updatereview = async function (req, res, next) {
    const reviewId = req.params.id;
    const update = req.body;
    try {
        let reviewDoc = await reviewService.updateReview(update, reviewId)
        res.status(200).json({
            success: true,
            message: 'review has been updated successfully!'
        });
    }catch (e) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }

}

exports.aaproveReview = async function (req, res, next) {
    const reviewId = req.params.reviewId;
    const update = {
        status: 'Approved',
        isActive: true
    };
    try{
        let reviewDoc = await reviewService.updateReview(update, reviewId)
        res.status(200).json({
            success: true
        });
    }catch (e) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }

}

exports.rejectReview = async function (req, res, next) {
    const reviewId = req.params.reviewId;
    const update = {
        status: 'Rejected'
    };
    try{
        let reviewDoc = await reviewService.updateReview(update, reviewId)
        res.status(200).json({
            success: true
        });
    }catch (e) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

exports.deleteAddress = async function (req, res, next) {
    const reviewId = req.params.id;
    try{
        let success = await reviewService.deleteReview(reviewId)
        res.status(200).json({
            success: true,
            message: `review has been deleted successfully!`
        });
    }catch (e) {
        return res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

