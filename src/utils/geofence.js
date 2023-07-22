// utils/geofence.js

function calculateDistance(lat1, lon1, lat2, lon2) {
  // Implementasi rumus haversine untuk menghitung jarak antara dua titik berdasarkan lintang dan bujur
  // ...
}

function isOutsideGeofence(
  currentLat,
  currentLon,
  targetLat,
  targetLon,
  radius
) {
  const distance = calculateDistance(
    currentLat,
    currentLon,
    targetLat,
    targetLon
  );
  return distance > radius;
}

module.exports = {
  isOutsideGeofence,
};
