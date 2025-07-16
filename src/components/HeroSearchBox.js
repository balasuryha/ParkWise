import React, { useState, useRef, useEffect } from 'react';
import './HeroSearchBox.css';
import { FaMapMarkerAlt, FaCarSide, FaCalendarAlt, FaBolt, FaMotorcycle, FaBicycle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function HeroSearchBox() {
  const [tab, setTab] = useState('time');
  const [showVehicleDropdown, setShowVehicleDropdown] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [isElectric, setIsElectric] = useState(false);
  const [locationInput, setLocationInput] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // const handleFindParkingNearMe = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       const lat = position.coords.latitude;
  //       const lng = position.coords.longitude;
  //       window.open(`https://www.google.com/maps/search/parking/@${lat},${lng},15z`, '_blank');
  //     }, (error) => {
  //       alert('Unable to get your location.');
  //     });
  //   } else {
  //     alert('Geolocation is not supported by your browser.');
  //   }
  // };

  const handleSearch = () => {
    const params = new URLSearchParams({
      city: locationInput,
      vehicle: selectedType,
      start: startDate,
      end: endDate,
      electric: isElectric
    }).toString();

    navigate(`/parking?${params}`);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowVehicleDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

return (
  <>
    {/* <button className="near-me-btn" onClick={handleFindParkingNearMe}>
      <span role="img" aria-label="location">📍</span> Find parking near me
    </button> */}
    
    <div className="hero-search">
      <div className="search-tabs">
        <button className={tab === 'time' ? 'active' : ''} onClick={() => setTab('time')}>Time/Day</button>
        <button className={tab === 'month' ? 'active' : ''} onClick={() => setTab('month')}>Per month</button>
      </div>

      <div className="search-fields">
        {/* Location */}
        <div className="input-group">
          <FaMapMarkerAlt className="icon" />
          <input
            type="text"
            placeholder="Where are you looking for parking?"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
          />
        </div>

        {/* Vehicle Dropdown */}
        <div className="vehicle-dropdown-container" ref={dropdownRef}>
          <div className="input-group vehicle-trigger" onClick={() => setShowVehicleDropdown(!showVehicleDropdown)}>
            <FaCarSide className="icon" />
            <input type="text" placeholder="Vehicle type" value={selectedType} readOnly />
          </div>

          {showVehicleDropdown && (
            <div className="vehicle-dropdown">
              <div className="vehicle-header">
                <FaBolt className="icon" />
                <span>Electric vehicle</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={isElectric}
                    onChange={() => setIsElectric(!isElectric)}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="vehicle-grid">
                {[
                  { label: 'Little', examples: 'Clio, E-208, Yaris', icon: <FaCarSide /> },
                  { label: 'Average', examples: 'Megane, Golf, Model 3', icon: <FaCarSide /> },
                  { label: 'Big', examples: 'Scenic, Model Y, E-3008', icon: <FaCarSide /> },
                  { label: 'Very large', examples: 'XC90, Touareg, iX1', icon: <FaCarSide /> },
                  { label: 'Very high (≥ 2m)', examples: 'Traffic, ID. Buzz', icon: <FaCarSide /> },
                  { label: 'Motorcycle', examples: 'Motorcycle, Scooter', icon: <FaMotorcycle /> },
                  { label: 'Bike', examples: 'Single, Cargo, Tandem', icon: <FaBicycle /> }
                ].map((type) => (
                  <div
                    key={type.label}
                    className={`vehicle-option ${selectedType === type.label ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedType(type.label);
                      setShowVehicleDropdown(false);
                    }}
                  >
                    <div className="vehicle-icon">{type.icon}</div>
                    <div className="vehicle-label">
                      <strong>{type.label}</strong>
                      <p>{type.examples}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Show date inputs only for Time/Day tab */}
        {tab === 'time' && (
          <>
            <div className="input-group half">
              <FaCalendarAlt className="icon" />
              <input
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />

            </div>
            <div className="input-group half">
              <FaCalendarAlt className="icon" />
              <input
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />

            </div>
          </>
        )}

        <button className="cta-btn" onClick={handleSearch}>To research</button>
      </div>
    </div>
  </>
);

}
