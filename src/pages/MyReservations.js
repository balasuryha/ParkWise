import React from 'react';
import './MyReservations.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function MyReservations() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const mockReservations = [
    {
      userEmail: 'jane@example.com',
      name: 'Parking République',
      address: '12 Rue de la Paix, Paris',
      date: '2025-07-01'
    },
    {
      userEmail: 'john@example.com',
      name: 'Parking Gare Lyon',
      address: '45 Boulevard Diderot, Paris',
      date: '2025-07-02'
    },
    {
      userEmail: 'jane@example.com',
      name: 'Parking Belleville',
      address: '22 Rue des Pyrénées, Paris',
      date: '2025-07-03'
    }
  ];

  if (!user) {
    return (
      <div className="reserve-container">
        <p>Veuillez vous connecter pour voir vos réservations.</p>
        <button onClick={() => navigate('/login')}>Connexion</button>
      </div>
    );
  }

  const userReservations = mockReservations.filter(r => r.userEmail === user.email);

  return (
    <div className="my-reservations">
      <h2>Mes Réservations</h2>
      {userReservations.length === 0 ? (
        <p>Aucune réservation pour le moment.</p>
      ) : (
        userReservations.map((res, index) => (
          <div className="reservation-card" key={index}>
            <h3>{res.name}</h3>
            <p>{res.address}</p>
            <p>Date: {res.date}</p>
          </div>
        ))
      )}
    </div>
  );
}
