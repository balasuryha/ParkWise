import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/components/Navbar.css'; 


export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">ParkWise</Link>
      </div>
      <ul className="navbar-links">
        <li className={location.pathname === '/' ? 'active' : ''}>
          <Link to="/">Home</Link>
        </li>
        <li className={location.pathname.startsWith('/parking') ? 'active' : ''}>
          <Link to="/parking">Parkings</Link>
        </li>
      </ul>
    </nav>
  );
}
