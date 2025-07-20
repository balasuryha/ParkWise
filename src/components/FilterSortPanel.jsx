import React, { useState } from 'react';
import '../styles/components/FilterSortPanel.css';

export default function FilterSortPanel({ onFilterChange, onSortChange }) {
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [filters, setFilters] = useState({
    outdoor: false,
    indoor: false,
    free: false,
    paid: false,
  });

  const handleFilterToggle = (key) => {
    const updated = { ...filters, [key]: !filters[key] };
    setFilters(updated);
    onFilterChange?.(updated);
  };

  const handleSortClick = (criteria) => {
    onSortChange?.(criteria);
    setShowSort(false);
  };

  return (
    <div className="filter-sort-container">
      <div className="dropdown-wrapper">
        <button className="dropdown-button" onClick={() => setShowFilter(!showFilter)}>
          Filter
        </button>
        {showFilter && (
          <div className="dropdown filter-dropdown">
            <label><input type="checkbox" checked={filters.outdoor} onChange={() => handleFilterToggle('outdoor')} /> Outdoor parking</label>
            <label><input type="checkbox" checked={filters.indoor} onChange={() => handleFilterToggle('indoor')} /> Indoor parking</label>
            <label><input type="checkbox" checked={filters.free} onChange={() => handleFilterToggle('free')} /> Free parking</label>
            <label><input type="checkbox" checked={filters.paid} onChange={() => handleFilterToggle('paid')} /> Paid parking</label>
          </div>
        )}
      </div>

      {/* <div className="dropdown-wrapper">
        <button className="dropdown-button" onClick={() => setShowSort(!showSort)}>
          Sort
        </button>
        {showSort && (
          <div className="dropdown sort-dropdown">
            <p onClick={() => handleSortClick('top')}>Top rated</p>
            <p onClick={() => handleSortClick('recommendation')}>Recommendation</p>
            <p onClick={() => handleSortClick('closest')}>Closest</p>
          </div>
        )}
      </div> */}
    </div>
  );
}
