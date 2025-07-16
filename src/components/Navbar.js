import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../context/AuthContext';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">ParkWise</div>

        <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>Accueil</Link>
          <Link to="/how-it-works" onClick={() => setMobileMenuOpen(false)}>Fonctionnement</Link>
          <Link to="/parking" onClick={() => setMobileMenuOpen(false)}>Parkings</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>

          {user ? (
            <>
              <span className="welcome-msg">Bonjour, {user.email}</span>
              <Link to="/my-reservations" className="btn-outline" onClick={() => setMobileMenuOpen(false)}>Mes réservations</Link>
              <button className="btn-outline" onClick={logout}>Se déconnecter</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn" onClick={() => setMobileMenuOpen(false)}>Connexion</Link>
              <Link to="/register" className="btn-outline" onClick={() => setMobileMenuOpen(false)}>Inscription</Link>
            </>
          )}
        </div>

        <div className="menu-toggle" onClick={toggleMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
}
