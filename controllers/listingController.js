const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const geocodeLocation = require("../middlewares/geocode.js");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
};

module.exports.newForm = (req, res) => {
    res.render("listings/newForm.ejs");
};

module.exports.createListing = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;

    const { location, country } = req.body.listing;
    const geoData = await geocodeLocation(location, country);
    if (!geoData) {
        req.flash("error", "Invalid location. Please enter a valid place.");
        return res.redirect("/listings/new");
    }

    const newListing = new Listing(req.body.listing);

    newListing.geometry = {
        type: "Point",
        coordinates: [geoData.lng, geoData.lat] // MongoDB format
    };

    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    await newListing.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listings");
};

module.exports.showListings = async (req, res) => {
    const {id} = req.params;
    const listing = await Listing.findById(id).populate({path: "reviews", populate: {path: "author"}}).populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist");
        return res.redirect("/listings");
    }

    const reviews = listing.reviews;
    const totalReviews = reviews.length;

    let ratingCount = {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0
    };

    let ratingSum = 0;

    for (let review of reviews) {
        ratingSum += review.rating;
        ratingCount[review.rating]++;
    }

    const avgRating = totalReviews ? (ratingSum / totalReviews).toFixed(1) : 0;

    res.render("listings/show.ejs", { listing, avgRating, totalReviews, ratingCount });
};

module.exports.editForm = async (req, res) => {
    const {id} = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist");
        return res.redirect("/listings");
    }

    res.render("listings/edit.ejs", {listing});
};

module.exports.updateListing = async (req, res) => {
    const { id } = req.params;

    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }

    const { location, country } = req.body.listing;

    const locationChanged =
        listing.location !== location ||
        listing.country !== country;

    if (locationChanged) {
        const geoData = await geocodeLocation(location, country);
        if (!geoData) {
            req.flash("error", "Invalid location. Please enter a valid place.");
            return res.redirect(`/listings/${id}/edit`);
        }

        listing.geometry = {
            type: "Point",
            coordinates: [geoData.lng, geoData.lat]
        };
    }

    listing.title = req.body.listing.title;
    listing.description = req.body.listing.description;
    listing.price = req.body.listing.price;
    listing.location = location;
    listing.country = country;

    if (req.file) {
        listing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }

    await listing.save();

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};


module.exports.deleteListing = async (req, res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};

module.exports.searchListing = async (req, res) => {
    let {q} = req.query;

    if (!q || q.trim() == "") {
        req.flash("error", "Please Enter a valid listing");
        return res.redirect("/listings");
    }

    q = q.trim();

    const listings = await Listing.find({ 
        $or: [
            { title: { $regex: q, $options: "i" } },
            { location: { $regex: q, $options: "i" } },
            { country: { $regex: q, $options: "i" } }
        ]
    });

    res.render("listings/index.ejs", { allListings: listings });
};