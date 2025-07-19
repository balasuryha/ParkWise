import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/ParkingCard.css';

export default function ParkingCard({ parking }) {
  return (
    <div className="parking-card">
      <img src={`https://source.unsplash.com/400x200/?parking,${parking.name}`} alt="parking" />
      <div className="card-details">
        <h3>{parking.name}</h3>
        <p>{parking.address}</p>
        <Link to={`/parking/${parking.id}`}>See forecast availability →</Link>
      </div>
    </div>
  );
}
