const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.isOwner = async (req, res, next) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if (!listing.owner.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the owner!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.isAuthor = async (req, res, next) => {
    let {id, reviewId} = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the author!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};