import React from 'react';
import './ParkingCard.css';
import { useNavigate } from 'react-router-dom';

export default function ParkingCard({ parking }) {
  const navigate = useNavigate();

  const handleReserve = () => {
    navigate('/reserve', { state: { parking } });
  };

  return (
    <div className="parking-card">
      <h3>{parking.name}</h3>
      <p>{parking.address}</p>
      <p><strong>Places disponibles:</strong> {parking.available}</p>
      <button className="btn-reserve" onClick={handleReserve}>Réserver</button>
    </div>
  );
}
