import React from 'react';
import './DestinationCard.css';

export default function DestinationCard({ city, image, spots, tags }) {
  return (
    <div className="destination-card" style={{ backgroundImage: `url(${image})` }}>
      <div className="card-overlay">
        <h3>{city}</h3>
        <p><strong>{spots}</strong> parking spaces available</p>
        <ul>
          {tags.map((tag, i) => (
            <li key={i}>{tag}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
