import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ParkingMap from '../components/ParkingMap';
import Navbar from '../components/Navbar';
import FilterSortPanel from '../components/FilterSortPanel';
import '../styles/pages/ParkingPage.css';

const rawData = [
  {
    id: 1,
    name: "Parking République",
    imageUrl: "/forecast/1/images/parking1.png",
    available: 12,
    rating: 4.3,
    distance: "300m",
    lat: 48.867,
    lon: 2.363,
    price: "€2.50/hr",
    type: ["outdoor", "paid"],
  },
  {
    id: 2,
    name: "Parking Belleville",
    imageUrl: "/forecast/1/images/parking2.png",
    rating: 4.1,
    distance: "500m",
    lat: 48.871,
    lon: 2.383,
    type: ["indoor", "paid"],
  },
  {
    id: 3,
    name: "Parking Bastille",
    imageUrl: "/forecast/1/images/parking3.png",
    rating: 3.9,
    distance: "700m",
    lat: 48.854,
    lon: 2.369,
    type: ["outdoor", "free"],
  },
];

export default function ParkingPage() {
  const location = useLocation();
  const [spots, setSpots] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    setSpots(rawData);
  }, []);

  const applyFilters = (filters) => {
    setFilters(filters);
    const activeKeys = Object.keys(filters).filter((key) => filters[key]);
    if (activeKeys.length === 0) {
      setSpots(rawData); // No filter selected
    } else {
      const filtered = rawData.filter((spot) =>
        activeKeys.every((type) => spot.type.includes(type))
      );
      setSpots(filtered);
    }
  };

  return (
    <>
    <Navbar />
      <div className="parking-page">
        <FilterSortPanel
          onFilterChange={applyFilters}
          onSortChange={(sort) => console.log('Sort:', sort)}
        />
        <div className="parking-content">
          <div className="parking-list">
            {spots.map((spot) => (
              <div key={spot.id} className="parking-card">
                <img src={spot.imageUrl} alt={spot.name} className="parking-img" />
                <div className="parking-info">
                  <h3>{spot.name}</h3>
                  <p>Rating: {spot.rating} ⭐</p>
                  <p>Distance: {spot.distance}</p>
                  {/* <p>Available: {spot.available} spots</p> */}
                  <a href={`/forecast/${spot.id}`} className="forecast-link">See forecast availability</a>
                  <a
                    className="view-map-btn"
                    href={`https://www.google.com/maps/dir/?api=1&destination=${spot.lat},${spot.lon}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View map
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="parking-map">
            <ParkingMap facilities={spots} />
          </div>
        </div>
      </div>
    </>
  );
}
