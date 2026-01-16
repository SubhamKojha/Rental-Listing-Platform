const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
require("dotenv").config();

const OWNER_IDS = [
    "696762ae6fc5999ac84328e7",
    "69676936a76737dfd3f4da17",
    "6967698007b446b8b662657a",
    "69677483f178d4c308929f6e"
];

console.log("MONGO_URL:", process.env.MONGO_URL);

async function main() {
    try {
        await mongoose.connect(
            process.env.MONGO_URL || "mongodb://localhost:27017/airbnb"
        );
        console.log("MongoDB connected");

        await initDb();

        console.log("Data seeding completed");
        process.exit();
    } catch (err) {
        console.error(err);
    }
}

const initDb = async () => {
    await Listing.deleteMany({});

    const listingsWithOwners = initData.data.map((obj) => ({
        ...obj,
        owner: OWNER_IDS[Math.floor(Math.random() * OWNER_IDS.length)]
    }));

    await Listing.insertMany(listingsWithOwners);
    console.log("Data Initialized with random owners");
};

main();
