const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        default: "https://unsplash.com/photos/two-sun-decorations-hang-on-a-wooden-door-J9Wtgz2Emr8",
        set: (v) => v === "" ? "https://unsplash.com/photos/two-sun-decorations-hang-on-a-wooden-door-J9Wtgz2Emr8" : v,
    },
    price: {
        type: Number,
    },
    location: {
        type: String,
    },
    country: {
        type: String,
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
});

//Middleware to delete all reviews related to a listing
listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({_id: {$in: listing.reviews }});
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;