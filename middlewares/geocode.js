const axios = require("axios");

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
          "User-Agent": "airbnb-clone"
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
    return null;
  }
}

module.exports = geocodeLocation;
