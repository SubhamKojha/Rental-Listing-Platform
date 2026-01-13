const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {reviewSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

// Server Side Validation for Reviews
const validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);
    if (error) {
        let errMessage = error.details.map((el) => el.message).join(",");
        throw new ExpressError (400, errMessage);
    } else {
        next();
    }
};

//Create Reviews Post Route
router.post("/", validateReview, wrapAsync( async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    req.flash("success", "New Review Created!");

    res.redirect(`/listings/${id}`);
}));

//Delete Reviews 
router.delete("/:reviewId", wrapAsync( async (req, res) => {
    let {id, reviewId} = req.params;

    await Listing.findByIdAndUpdate(id, {$pull: { reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review Deleted!");

    res.redirect(`/listings/${id}`);
}));

module.exports = router;