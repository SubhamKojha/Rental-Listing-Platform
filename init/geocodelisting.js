const mongoose = require("mongoose");
const axios = require("axios");
const Listing = require("../models/listing.js");
require("dotenv").config({ path: "../.env" });

/**
 * Convert location + country into lat/lng using Nominatim
 */
async function geocodeLocation(location, country) {
  try {
    const query = `${location}, ${country}`;

    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: query,
          format: "json",
          limit: 1
        },
        headers: {
          "User-Agent": "airbnb-clone-migration"
        }
      }
    );

    if (!response.data || response.data.length === 0) {
      return null;
    }

    return {
      lat: parseFloat(response.data[0].lat),
      lng: parseFloat(response.data[0].lon)
    };
  } catch (err) {
    console.error("❌ Geocoding failed for:", location, country);
    return null;
  }
}

/**
 * Main migration function
 */
async function migrateListings() {
  try {
    await mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/airbnb");
    console.log("✅ MongoDB connected");

    const listings = await Listing.find({
      $or: [
        { geometry: { $exists: false } },
        { "geometry.coordinates": { $exists: false } }
      ]
    });

    console.log(`🔍 Found ${listings.length} listings to migrate`);

    for (let listing of listings) {
      const geoData = await geocodeLocation(
        listing.location,
        listing.country
      );

      if (!geoData) {
        console.log(
          `⚠️ Skipping: ${listing.location}, ${listing.country}`
        );
        continue;
      }

      listing.geometry = {
        type: "Point",
        coordinates: [geoData.lng, geoData.lat] // MongoDB = [lng, lat]
      };

      await listing.save();

      console.log(
        `✅ Updated: ${listing.location}, ${listing.country}`
      );

      // IMPORTANT: Respect Nominatim rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log("🎉 Migration complete");
    mongoose.connection.close();
  } catch (err) {
    console.error("🔥 Migration failed:", err);
    mongoose.connection.close();
  }
}

// Run migration
migrateListings();
