const ExpressError = require("../utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("../schema.js");

// Server Side Validation for Listings
module.exports.validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);
    if (error) {
        let errMessage = error.details.map((el) => el.message).join(",");
        throw new ExpressError (400, errMessage);
    } else {
        next();
    }
};

// Server Side Validation for Reviews
module.exports.validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);
    if (error) {
        let errMessage = error.details.map((el) => el.message).join(",");
        throw new ExpressError (400, errMessage);
    } else {
        next();
    }
};