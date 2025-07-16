import React from 'react';
import './HowItWorks.css';

export default function HowItWorks() {
  return (
    <div className="page-container">
      <h2>Comment ça marche ?</h2>
      <p>ParkWise vous permet de réserver facilement une place de parking en ville.</p>

      <ol className="how-list">
        <li><strong>1. Trouver :</strong> Utilisez la barre de recherche pour trouver un parking à proximité.</li>
        <li><strong>2. Réserver :</strong> Sélectionnez votre créneau horaire et réservez immédiatement.</li>
        <li><strong>3. Accéder :</strong> Accédez au parking grâce à votre smartphone ou QR code.</li>
      </ol>
    </div>
  );
}
