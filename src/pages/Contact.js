import React from 'react';

export default function Contact() {
  return (
    <div className="page-container">
      <h2>Contactez-nous</h2>
      <p>Une question ou un souci ? Contactez notre équipe support :</p>

      <ul style={{ marginTop: '1rem' }}>
        <li>Email : support@parkwise.com</li>
        <li>Téléphone : +33 1 23 45 67 89</li>
        <li>Adresse : 12 rue du Stationnement, 75000 Paris</li>
      </ul>
    </div>
  );
}
