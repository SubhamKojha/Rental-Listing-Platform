const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const {validateReview} = require("../middlewares/validations.js");
const {isLoggedIn} = require("../middlewares/userMiddleware.js");
const {isAuthor} = require("../middlewares/authorization.js");
const reviewController = require("../controllers/reviewController.js");

//Create Reviews Post Route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

//Delete Reviews 
router.delete("/:reviewId", isLoggedIn, isAuthor, wrapAsync(reviewController.deleteReview));

module.exports = router;