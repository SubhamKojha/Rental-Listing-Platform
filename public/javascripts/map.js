document.addEventListener("DOMContentLoaded", () => {
  const mapContainer = document.getElementById("map");
  if (!mapContainer) return;

  if (!window.listingCoords) {
    console.error("Map container found but listingCoords missing");
    return;
  }

  const [lng, lat] = window.listingCoords;

  const map = L.map("map").setView([lat, lng], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(window.listingTitle || "Listing")
    .openPopup();
});
