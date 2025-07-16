import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import './ParkingMap.css';

const customIcon = new L.Icon({
  iconUrl: require('../assets/icon/marker.png'), // Add your own marker icon
  iconSize: [30, 40],
});

export default function ParkingMap({ parkings }) {
  const center = [48.8566, 2.3522]; // Paris center

  return (
    <div className="map-container">
      <MapContainer center={center} zoom={13} scrollWheelZoom={false} style={{ height: "400px", width: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {parkings.map((parking, index) => (
          <Marker key={index} position={parking.location} icon={customIcon}>
            <Popup>
              <strong>{parking.name}</strong><br />
              {parking.address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
