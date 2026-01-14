const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const path = require("path");
require("dotenv").config();

console.log("MONGO_URL:", process.env.MONGO_URL);

async function main () {
    try {
        await mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/airbnb");
        console.log("MongoDb connected"); 
        await initDb();
        console.log("Data seeding completed");
        process.exit();   
    }
    catch(err) {
        console.log(err);
    }    
}

const initDb = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner: "69676936a76737dfd3f4da17"
    }));
    await Listing.insertMany(initData.data);
    console.log("Data Initialized");
}

main();