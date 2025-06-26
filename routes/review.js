const express = require("express")
const router = express.Router({mergeParams:true})
const wrapAsync = require("../utils/wrapAsync.js")
const expressError = require("../utils/expressError.js")
const Review = require("../models/review.js")
const {reviewSchema} = require("../schema.js")
const Listing = require("../models/listing.js")
const authenticate = require("../views/authenticate.js")
const reviewController = require("../controllers/review.js")

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        return next(new expressError(400, error.details[0].message));
    }
    next();
};

//Review save route
router.post("/" , authenticate.isLoggedin ,validateReview, wrapAsync(reviewController.saveReview))

module.exports = router