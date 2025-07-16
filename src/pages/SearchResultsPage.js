import React from 'react';
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './SearchResultsPage.css'; // Create this for styling

export default function SearchResultsPage() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const location = params.get('location') || 'Paris, France';
  // const vehicle = params.get('vehicle') || 'Little';
  // const isElectric = params.get('electric') === 'true';
  // const tab = params.get('tab') || 'time';

  const results = [
    { id: 1, name: 'Paris - City Hall - SAEMES', price: 4.83, lat: 48.8575, lng: 2.3513 },
    { id: 2, name: 'Saint-Paul', price: 4.50, lat: 48.8550, lng: 2.3521 },
    { id: 3, name: 'St-Eustache - SAEMES', price: 5.04, lat: 48.8580, lng: 2.3500 }
  ];

  return (
    <div className="results-container">
      <div className="results-list">
        <h2>Results for {location}</h2>
        {results.map(r => (
          <div className="result-card" key={r.id}>
            <h3>{r.name}</h3>
            <p><strong>{r.price}€</strong> per hour</p>
          </div>
        ))}
      </div>
      <div className="results-map">
        <MapContainer center={[48.8575, 2.3513]} zoom={15} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {results.map(r => (
            <Marker position={[r.lat, r.lng]} key={r.id}>
              <Popup>{r.name} - {r.price}€</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
