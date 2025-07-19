import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-title">
        Parkwise
      </Link>
    </nav>
  );
}
