// src/components/HeroSearchBar.js
import React from 'react';
import { Calendar, Car, LocateFixed, Search, ArrowRightLeft } from 'lucide-react';
import './SearchBar.css';

export default function HeroSearchBar() {
  return (
    <div className="search-bar-container">
      <div className="tab-toggle">
        <button className="active">Time/Day</button>
        <button>Per month</button>
      </div>

      <div className="search-inputs">
        <div className="input-group">
          <LocateFixed className="icon" />
          <input type="text" placeholder="Where are you looking for parking?" />
        </div>

        <div className="input-group">
          <Calendar className="icon" />
          <input type="datetime-local" />
        </div>

        <ArrowRightLeft className="arrow" />

        <div className="input-group">
          <Calendar className="icon" />
          <input type="datetime-local" />
        </div>

        <div className="input-group">
          <Car className="icon" />
          <input type="text" placeholder="Vehicle type" />
        </div>

        <button className="search-btn">
          <Search />
        </button>
      </div>
    </div>
  );
}
