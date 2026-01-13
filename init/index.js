const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const path = require("path");
require("dotenv").config();

console.log("MONGO_URL:", process.env.MONGO_URL);

async function main () {
    try {
        await mongoose.connect(process.env.MONGO_URL);
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
    await Listing.insertMany(initData.data);
    console.log("Data Initialized");
}

main();