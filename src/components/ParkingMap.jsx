import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Custom icon (optional)
const customIcon = new L.Icon({
  iconUrl: '/icon/parking_icon.png', // Add your own icon in public/icon folder
  iconSize: [22, 30],                // Width, Height in pixels (adjust as needed)
  iconAnchor: [20, 40],              // Anchor the bottom-center of icon to the map point
  popupAnchor: [0, -40],
});

export default function ParkingMap({ facilities }) {
  const center = [48.8566, 2.3522]; // Center on Paris by default

  return (
    <MapContainer center={center} zoom={13} className="parking-map">
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {facilities.map((spot) => (
        <Marker
          key={spot.id}
          position={[spot.lat, spot.lon]}
          icon={customIcon}
        >
          <Popup>
            <strong>{spot.name}</strong><br />
            Available: {spot.available} spots<br />
            Price: {spot.price}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
