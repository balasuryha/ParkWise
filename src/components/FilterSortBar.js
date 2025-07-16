import React, { useState } from 'react';
import { SlidersHorizontal, Info, X } from 'lucide-react';
import './FilterSortBar.css';

export default function FilterSortBar() {
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('The closest');
  const [filterOpen, setFilterOpen] = useState(false);
  const [showShortTerm, setShowShortTerm] = useState(true);
  const [vehicleType, setVehicleType] = useState('');
  const [isElectric, setIsElectric] = useState(false);

  const sortOptions = ['The closest', 'Novelty', 'Top rated', 'Recommendation'];
  const vehicleOptions = ['Any', 'Little', 'Average', 'Big', 'Very large', 'Motorcycle', 'Bike'];

  return (
    <>
      <div className="filter-sort-container">
        <div className="top-bar-controls">
          <button className="filter-btn" onClick={() => setFilterOpen(true)}>
            <SlidersHorizontal size={18} /> Filters
          </button>

          <div className="sort-ranking">
            <div className="sort-dropdown-wrapper">
              <div className="sort-dropdown" onClick={() => setSortOpen(!sortOpen)}>
                <span className="sort-value">Sort : {selectedSort}</span>
                <span className="arrow">▾</span>
              </div>
              {sortOpen && (
                <ul className="sort-options-dropdown">
                  {sortOptions.map((option) => (
                    <li
                      key={option}
                      className={`sort-option-item ${selectedSort === option ? 'selected' : ''}`}
                      onClick={() => {
                        setSelectedSort(option);
                        setSortOpen(false);
                      }}
                    >
                      <span>{option}</span>
                      <span className="option-radio">
                        <span className={selectedSort === option ? 'radio-selected' : 'radio-unselected'}></span>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="ranking-info">
              Ranking of results <Info size={16} />
            </div>
          </div>
        </div>
      </div>

      {filterOpen && (
        <div className="filter-modal-overlay" onClick={() => setFilterOpen(false)}>
          <div className="filter-modal" onClick={(e) => e.stopPropagation()}>
            <div className="filter-modal-header">
              <h3>Search filters</h3>
              <button onClick={() => setFilterOpen(false)}><X /></button>
            </div>
            <div className="filter-modal-body">
              <div className="filter-group">
                <label>
                  <input
                    type="checkbox"
                    checked={showShortTerm}
                    onChange={() => setShowShortTerm(!showShortTerm)}
                  />
                  Show short term parking only
                </label>
              </div>
              <div className="filter-group">
                <label>Vehicle type</label>
                <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
                  {vehicleOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div className="filter-group">
                <label>
                  <input
                    type="checkbox"
                    checked={isElectric}
                    onChange={() => setIsElectric(!isElectric)}
                  />
                  Electric vehicle
                </label>
              </div>
            </div>
            <div className="filter-modal-footer">
              <button className="btn-reset" onClick={() => {
                setShowShortTerm(true);
                setVehicleType('');
                setIsElectric(false);
              }}>Reset</button>
              <button className="btn-apply" onClick={() => setFilterOpen(false)}>Apply</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}