import React, { useState } from 'react';
import Select from 'react-select';
import { FaCrosshairs, FaClock } from 'react-icons/fa';
import '../styles/components/HeroSearchBox.css';

export default function HeroSearchBox({ onSearch }) {
  const [vehicle, setVehicle] = useState('');
  const [location, setLocation] = useState(null);
  const [latLon, setLatLon] = useState(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  
  const handleUseCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatLon({ lat: latitude, lon: longitude });
        setLocation({ label: 'Current location', value: 'current' });
      },
      () => {
        alert('Unable to fetch your location');
      }
    );
  };

  const handleLocationChange = (selectedOption) => {
    if (selectedOption.value === 'current') {
      handleUseCurrentLocation();
    } else {
      setLocation(selectedOption);
      setLatLon(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const baseParams = {
      vehicle,
      location: location?.value || '',
      start: startTime,
      end: endTime,
    };

    if (latLon) {
      baseParams.lat = latLon.lat;
      baseParams.lon = latLon.lon;
    }

    onSearch(baseParams);
  };

  const locationOptions = [
    {
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FaCrosshairs /> Current location
        </div>
      ),
      value: 'current',
    },
    {
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          Paris, France
        </div>
      ),
      value: 'Paris',
    },
    {
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          Lyon, France
        </div>
      ),
      value: 'Lyon',
    },
    {
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          Nice, France
        </div>
      ),
      value: 'Nice',
    },
    {
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          Marseille, France
        </div>
      ),
      value: 'Marseille',
    },
  ];

  return (
    <div className="hero-container">
      <div className="hero-card">
        <form className="hero-form" onSubmit={handleSubmit}>
          <Select
            className="react-select-container"
            classNamePrefix="react-select"
            options={locationOptions}
            onChange={handleLocationChange}
            value={location}
            placeholder="Select location"
          />

          <select
            className="input-field"
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
            required
          >
            <option value="">Vehicle type</option>
            <option value="Little">Little</option>
            <option value="Average">Average</option>
            <option value="Big">Big</option>
            <option value="Very large">Very large</option>
            <option value="Electric">Electric</option>
          </select>

          <div className="date-pickers">
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
            <span>→</span>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="search-btn">
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
