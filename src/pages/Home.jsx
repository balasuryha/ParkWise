import React, { useState } from 'react';
import HeroSearchBox from '../components/HeroSearchBox';

export default function Home() {
  const [searchParams, setSearchParams] = useState(null);

  const handleSearch = (params) => {
    setSearchParams(params);
    const query = new URLSearchParams(params).toString();
    window.location.href = `/parking?${query}`;
  };

  return (
    <div
    style={{
      backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/images/bg_parking.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center', // center vertically
      alignItems: 'center',     // center horizontally
      padding: '2rem',
      boxSizing: 'border-box',
      textAlign: 'center',
    }}
  >
    <div className="hero-wrapper">
      <header className="home-header">
        <h1>Parkwise</h1>
        <p>Find available parking spots near you — fast, smart, reliable.</p>
      </header>

      <div className="hero-card-wrapper">
        <HeroSearchBox onSearch={handleSearch} />
      </div>
    </div>
  </div>


  );
}
