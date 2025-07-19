import React, { useState } from 'react';
import '../styles/components/FilterSortBar.css';

export default function FilterSortBar() {
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('The closest');
  const sortOptions = ['The closest', 'Novelty', 'Top rated', 'Recommendation'];

  return (
    <div className="filter-sort-bar">
      <button className="filter-btn">
        <i className="icon">⚙️</i> Filters
      </button>
      <div className="sort-dropdown">
        <button onClick={() => setSortOpen(!sortOpen)} className="sort-btn">
          Sort: {selectedSort} <span className="arrow">▾</span>
        </button>
        {sortOpen && (
          <ul className="sort-options">
            {sortOptions.map((option) => (
              <li
                key={option}
                onClick={() => {
                  setSelectedSort(option);
                  setSortOpen(false);
                }}
              >
                {option} {selectedSort === option && <span className="dot" />}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="ranking-info">
        Ranking of results <span className="info-icon">ℹ️</span>
      </div>
    </div>
  );
}
