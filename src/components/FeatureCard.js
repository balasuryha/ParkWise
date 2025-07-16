import React from 'react';
import './FeatureCard.css';

export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="feature-card">
      <img src={icon} alt={title} className="feature-icon" />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
