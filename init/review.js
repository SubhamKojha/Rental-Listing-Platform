const mongoose = require("mongoose");
const Review = require("../models/review");
const Listing = require("../models/listing");
const User = require("../models/user");
require("dotenv").config({ path: "../.env" });

const sampleComments = [
  "Amazing place! Would definitely stay again.",
  "Great location and very clean.",
  "Host was super helpful and responsive.",
  "Worth the price. Smooth experience.",
  "Beautiful view and peaceful surroundings.",
  "Decent stay, but could be better.",
  "Loved every bit of it!",
  "Comfortable and cozy. Recommended.",
  "Photos don’t do justice. Even better in person.",
  "Nice stay overall."
];

async function seedReviews() {
  try {
    await mongoose.connect(process.env.MONGO_URL + "airbnb");
    console.log("✅ Connected to airbnb (reviews seed)");

    // Clear old reviews
    await Review.deleteMany({});
    console.log("🧹 Old reviews cleared");

    const listings = await Listing.find({});
    const users = await User.find({});

    if (listings.length === 0 || users.length === 0) {
      throw new Error("Listings or Users missing. Seed them first.");
    }

    for (let listing of listings) {
      const numberOfReviews = Math.floor(Math.random() * 3) + 1; // 1–3 reviews per listing

      for (let i = 0; i < numberOfReviews; i++) {
        const randomUser =
          users[Math.floor(Math.random() * users.length)];

        const review = new Review({
          comment:
            sampleComments[
              Math.floor(Math.random() * sampleComments.length)
            ],
          rating: Math.floor(Math.random() * 5) + 1,
          author: randomUser._id
        });

        await review.save();

        listing.reviews.push(review._id);
      }

      await listing.save();
    }

    console.log("🎉 Reviews seeded successfully");
    process.exit();
  } catch (err) {
    console.error("🔥 Review seeding failed:", err);
    process.exit(1);
  }
}

seedReviews();
