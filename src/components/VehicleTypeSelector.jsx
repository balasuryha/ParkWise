import React from 'react';
import '../styles/components/VehicleTypeSelector.css';

export default function VehicleTypeSelector({ value, onChange }) {
  return (
    <select className="vehicle-selector" value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="Any">Vehicle type</option>
      <option value="Little">Little</option>
      <option value="Average">Average</option>
      <option value="Big">Big</option>
      <option value="Very large">Very large</option>
    </select>
  );
}
