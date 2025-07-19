import React from 'react';

export default function EventList({ events }) {
  if (!events.length) return <p>No upcoming events nearby.</p>;
  return (
    <ul>
      {events.map((event, i) => (
        <li key={i}>
          {event.name} – {event.date} – {event.distance}m away
        </li>
      ))}
    </ul>
  );
}
