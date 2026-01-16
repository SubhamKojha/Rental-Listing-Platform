const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const User = require("./user.js");
const { string } = require("joi");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        url: String,
        filename: String,
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
    geometry: {
        type: {
            type: String,
            enum: ["Point"]
        },
        coordinates: {
            type: [Number] // [lng, lat]
        }
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
});

//Middleware to delete all reviews related to a listing
listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({_id: {$in: listing.reviews }});
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;