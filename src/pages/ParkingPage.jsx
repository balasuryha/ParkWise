// src/pages/ParkingPage.jsx

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ParkingMap from '../components/ParkingMap'; // correct import
import '../styles/pages/ParkingPage.css';
import Navbar from '../components/Navbar';

export default function ParkingPage() {
  const [spots, setSpots] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    // Try to fetch real data
    fetch('/api/facilities')
      .then(res => {
        if (!res.ok) throw new Error('API failed');
        return res.json();
      })
      .then(data => setSpots(data))
      .catch(() => {
        // Fallback to dummy spots
        setSpots([
          {
            id: 1,
            name: 'Parking Spot 1',
            lat: 48.8566,
            lon: 2.3522,
            city: 'Paris',
            imageUrl: '/images/parking1.jpg'
          },
          {
            id: 2,
            name: 'Parking Spot 2',
            lat: 48.8584,
            lon: 2.2945,
            city: 'Paris',
            imageUrl: '/images/parking2.jpg'
          }
        ]);
      });
  }, []);

  return (
    <>
      <Navbar />
        <div className="parking-page">
          <div className="spots-list">
            <h2>Available Parking Spots</h2>
            {spots.map((spot) => (
              <div key={spot.id} className="spot-card">
                <img src={spot.imageUrl} alt={spot.name} className="spot-img" />
                <div className="spot-info">
                  <h3>{spot.name}</h3>
                  <a href={`/forecast/${spot.id}`}>See forecast availability →</a>
                </div>
              </div>
            ))}
          </div>
          <div className="spots-map">
            <ParkingMap facilities={spots} />
          </div>
        </div>
    </>
  );
}
