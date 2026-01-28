const mongoose = require("mongoose");
const Listing = require("../models/listing");
const User = require("../models/user");
const initData = require("./data");
require("dotenv").config({ path: "../.env" }); // adjust if needed

async function seedListings() {
  try {
    await mongoose.connect(process.env.MONGO_URL + "airbnb");
    console.log("Connected to airbnb (listings seed)");

    // clear old listings
    await Listing.deleteMany({});

    // fetch real users from DB
    const users = await User.find({});
    if (users.length === 0) {
      throw new Error("No users found. Seed users first.");
    }

    // attach random owner to each listing
    const listingsWithOwners = initData.data.map((listing) => ({
      ...listing,
      owner: users[Math.floor(Math.random() * users.length)]._id
    }));

    await Listing.insertMany(listingsWithOwners);

    console.log(`Seeded ${listingsWithOwners.length} listings with random owners`);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedListings();
