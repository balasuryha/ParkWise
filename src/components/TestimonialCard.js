import React from 'react';
import './TestimonialCard.css';

export default function TestimonialCard({ name, time, title, text }) {
  return (
    <div className="testimonial-card">
      <div className="quote-mark">“</div>
      <h4>{title}</h4>
      <p className="text">{text}</p>
      <p className="author">{name} – {time}</p>
    </div>
  );
}
