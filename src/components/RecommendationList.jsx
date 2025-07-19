import React from 'react';
import { Link } from 'react-router-dom';

export default function RecommendationList({ list }) {
  if (!list.length) return <p>No suggestions found.</p>;
  return (
    <ul>
      {list.map((item) => (
        <li key={item.id}>
          <strong>{item.name}</strong> – <Link to={`/parking/${item.id}`}>See forecast</Link>
        </li>
      ))}
    </ul>
  );
}
