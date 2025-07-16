import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import parkingData from '../data/parkings.json';
import ParkingCard from '../components/ParkingCard';
import MapboxMap from '../components/MapboxMap';

import SearchBar from '../components/SearchBar';
import FilterSortBar from '../components/FilterSortBar';

import './ParkingPage.css';

export default function ParkingPage() {
  const [searchParams] = useSearchParams();
  const city = searchParams.get('city')?.toLowerCase() || '';
  const [tab, setTab] = useState('time');
  const filteredParkings = parkingData.filter((p) =>
    p.name.toLowerCase().includes(city)
  );

  return (
    <>

      <SearchBar tab={tab} setTab={setTab} />
        <div className="parking-page">
          <div className="parking-results">
            <FilterSortBar />
            <div className="parking-header">
              <h2>Available Parkings</h2>
              <p>{filteredParkings.length} results</p>
            </div>
            {/* <div className="result-list">
              {filteredParkings.map((p, index) => (
                <div key={index} className="result-card">
                  <h3>{p.name}</h3>
                  <p>{p.address}</p>
                  <p><strong>Places disponibles:</strong> {p.available}</p>
                  <button className="btn">Réserver</button>
                </div>
              ))}
            </div> */}

            <div className="parking-list">
              {filteredParkings.map((p, index) => (
                <ParkingCard key={index} parking={p} />
              ))}
            </div>

            
          </div>
          <div className="parking-map">
            <MapboxMap parkings={filteredParkings} />
          </div>
      </div>
    </>
  );
}
