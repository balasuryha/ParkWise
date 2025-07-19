// src/components/FilterModal.jsx
import React from 'react';
import '../styles/components/FilterModel.css';


export default function FilterModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="filter-modal-overlay">
      <div className="filter-modal">
        <div className="modal-header">
          <h3>Filter Parkings</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-section">
          <label><strong>Vehicle Size</strong></label>
          <select>
            <option>Any</option>
            <option>Little</option>
            <option>Average</option>
            <option>Big</option>
            <option>Very large</option>
          </select>
        </div>

        <div className="modal-section">
          <label><strong>Electric Vehicle</strong></label>
          <input type="checkbox" /> Show only electric charging spots
        </div>

        <div className="modal-section">
          <label><strong>Show short-term options</strong></label>
          <input type="checkbox" />
        </div>

        <div className="modal-footer">
          <button className="apply-btn" onClick={onClose}>Apply</button>
        </div>
      </div>
    </div>
  );
}
