// src/components/SearchBar.js
import React from 'react';
import { CalendarDays, MapPin, Clock, Car, ArrowRight, Search } from 'lucide-react';
import './SearchBar.css';

export default function SearchBar({ tab, setTab }) {
  return (
    <div className="search-bar-container">
      <div className="tab-toggle">
        <button className={tab === 'time' ? 'active' : ''} onClick={() => setTab('time')}>Time/Day</button>
        <button className={tab === 'month' ? 'active' : ''} onClick={() => setTab('month')}>Per month</button>
      </div>

      <div className="search-inputs">
        <div className="input-group">
          <MapPin className="icon" />
          <input type="text" placeholder="Where are you looking for parking?" />
        </div>

        <div className="input-group">
          <CalendarDays className="icon" />
          <input type="datetime-local" />
        </div>

        <ArrowRight className="arrow" />

        <div className="input-group">
          <CalendarDays className="icon" />
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
