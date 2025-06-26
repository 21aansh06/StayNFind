const Review = require("../models/review.js")
const Listing =require("../models/listing.js")

module.exports.saveReview = async(req,res)=>{
  let {id} = req.params
  let {comment , rating} = req.body
    let reviewListing = await Listing.findById(id)
    let review = new Review({
        comment: comment,
        rating: rating,
        createdBy: req.user._id
    })
    await review.save()
  reviewListing.reviews.push(review._id);

    await reviewListing.save()
    req.flash("success", "Review added successfully.")
    res.redirect(`/listings/${reviewListing._id}`)
}