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
          limit: 1,
          addressdetails: 1
        },
        headers: {
          // REQUIRED by Nominatim
          "User-Agent": "airbnb-clone/1.0 (contact: subham.dev@gmail.com)",
          "Accept-Language": "en"
        },
        timeout: 15000
      }
    );

    if (!Array.isArray(response.data) || response.data.length === 0) {
      return null;
    }

    return {
      lat: Number(response.data[0].lat),
      lng: Number(response.data[0].lon)
    };
  } catch (err) {
    console.error(
      `❌ Geocoding failed for: ${location}, ${country}`,
      err.message
    );
    return null;
  }
}

/**
 * Main migration function
 */
async function migrateListings() {
  try {
    // ✅ ALWAYS append DB name
    await mongoose.connect(process.env.MONGO_URL + "airbnb");
    console.log("✅ MongoDB connected to airbnb");

    const listings = await Listing.find({
      $or: [
        { geometry: { $exists: false } },
        { geometry: null },
        { "geometry.coordinates": { $size: 0 } }
      ]
    });

    console.log(`🔍 Found ${listings.length} listings to migrate`);

    for (let listing of listings) {
      const geoData = await geocodeLocation(
        listing.location,
        listing.country
      );

      if (!geoData) {
        console.log(`⚠️ Skipping: ${listing.location}, ${listing.country}`);
        continue;
      }

      listing.geometry = {
        type: "Point",
        coordinates: [geoData.lng, geoData.lat]
      };

      await listing.save();

      console.log(`✅ Updated: ${listing.location}, ${listing.country}`);

      // ✅ REQUIRED: 1 request / second
      await new Promise(r => setTimeout(r, 1000));
    }

    console.log("🎉 Migration complete");
    await mongoose.connection.close();
    process.exit();
  } catch (err) {
    console.error("🔥 Migration failed:", err);
    await mongoose.connection.close();
    process.exit(1);
  }
}

// Run migration
migrateListings();
