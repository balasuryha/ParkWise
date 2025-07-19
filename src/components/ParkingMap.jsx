import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function ParkingMap({ facilities }) {
  const defaultPosition = [48.8566, 2.3522]; // Default to Paris

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <MapContainer center={defaultPosition} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {facilities.map((facility) => (
          <Marker key={facility.id} position={[facility.lat, facility.lon]}>
            <Popup>
              <strong>{facility.name}</strong><br />
              {facility.city}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
