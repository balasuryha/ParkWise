import React, { useState } from 'react';
import './Home.css';

import heroBg from '../assets/hero-bg.jpg';
import FeatureCard from '../components/FeatureCard';
import SearchBar from '../components/SearchBar';
import ParkingCard from '../components/ParkingCard';
import ParkingMap from '../components/ParkingMap';
import HeroSearchBox from '../components/HeroSearchBox';

import parkingData from '../data/parkings.json';

import bookIcon from '../assets/icon/reservation.png';
import accessIcon from '../assets/icon/reservation 1.png';
import saveIcon from '../assets/icon/reservation.png';

import DestinationCard from '../components/DestinationCard';
import destinationData from '../data/destinations.json';

import TestimonialCard from '../components/TestimonialCard';
import testimonialData from '../data/testimonials.json';



export default function Home() {
  const [results, setResults] = useState([]);

  const handleSearch = (city, date) => {
    const filtered = parkingData.filter((p) =>
      p.address.toLowerCase().includes(city.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <>
      {/* Hero section with embedded search box */}
      <div className="hero" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Garez-vous malin avec ParkWise</h1>
            <p>Réservez votre place de parking en quelques secondes, partout en ville</p>
            <div style={{ marginTop: '1.2rem', width: '100%', maxWidth: '900px' }}>

              <HeroSearchBox />
            </div>
          </div>
        </div>
      </div>

      {/* Feature cards */}
      <div className="features-section">
        <FeatureCard
          icon={bookIcon}
          title="Réservez"
          description="Trouvez et réservez une place en quelques secondes"
        />
        <FeatureCard
          icon={accessIcon}
          title="Accédez facilement"
          description="Entrez dans le parking via votre smartphone"
        />
        <FeatureCard
          icon={saveIcon}
          title="Économisez"
          description="Gagnez du temps et réduisez vos frais de stationnement"
        />
      </div>

      <div className="destination-section">
        <h2 className="section-title">Find parking near your destination</h2>
        <div className="destination-scroll">
          {destinationData.map((dest, idx) => (
            <DestinationCard key={idx} {...dest} />
          ))}
        </div>
      </div>


      {/* Search and parking results */}
      <SearchBar onSearch={handleSearch} />

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {results.map((parking, index) => (
          <ParkingCard key={index} parking={parking} />
        ))}
      </div>

      <ParkingMap parkings={results} />

      <div className="testimonial-section">
        <h2 className="section-title">The ParkWise experience by our users 🌟</h2>
        <div className="testimonial-scroll">
          {testimonialData.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
      </div>

    </>
  );
}
