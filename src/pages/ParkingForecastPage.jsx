import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ParkingMap from '../components/ParkingMap'; // Reuse same map component
import '../styles/pages/ParkingForecastPage.css';
import '../styles/components/ParkingMap.css';
import Navbar from '../components/Navbar';
 // Ensure map styles are applied
// import '../styles/components/ParkingForecastPage.css'; // Custom styles for forecast page

export default function ParkingForecastPage() {
  const { facilityId } = useParams();
  const [facility, setFacility] = useState(null);
  const [events, setEvents] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // Simulated fetch – replace with actual API calls
    setFacility({
      id: facilityId,
      name: "Parking République",
      available: 12,
      forecastMessage: "Moderate traffic in 2 hours",
      lat: 48.867,
      lon: 2.363,
      city: "Paris",
      imageUrl: "/images/parking1.jpg"
    });

    setEvents([
      {
        name: "Concert at République",
        time: "18:00",
        distance: "300m"
      }
    ]);

    setRecommendations([
      {
        id: 2,
        name: "Parking Belleville",
        city: "Paris",
        lat: 48.871,
        lon: 2.383,
        imageUrl: "/images/Login_Background.jpg"
      }
    ]);
  }, [facilityId]);

  if (!facility) return <p>Loading...</p>;

  return (
    <>
        <Navbar />
            <div className="forecast-page dark-theme">
                <h2>{facility.name}</h2>
                <p>Currently <strong>{facility.available}</strong> spots available</p>
                <p>Forecast: {facility.forecastMessage}</p>

                {events.length > 0 && (
                    <div className="event-box">
                    <h4>Nearby Event</h4>
                    {events.map((event, i) => (
                        <p key={i}>{event.name} at {event.time} ({event.distance} away)</p>
                    ))}
                    </div>
                )}

                <div className="forecast-graph">
                    <h3>Forecasted Occupancy (24h)</h3>
                    <img src={`/forecast/${facility.id}/images/Login_Background.jpg`} alt="Occupancy Graph" className="forecast-img" />
                    <a href={`/forecast/${facility.id}/csv`} download>Download Forecast CSV</a>
                </div>

                <div className="alt-recommendations">
                    <h3>Other Parking Options</h3>
                    {recommendations.map((rec) => (
                    <div key={rec.id} className="spot-card">
                        <img src={rec.imageUrl} alt={rec.name} className="spot-img" />
                        <div>
                        <h4>{rec.name}</h4>
                        <a href={`/forecast/${rec.id}`}>View details →</a>
                        </div>
                    </div>
                    ))}
                </div>

                <div className="map-section">
                    <h3>Map & Directions</h3>
                    <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${facility.lat},${facility.lon}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="map-btn"
                    >
                        Get Directions
                    </a>

                    <div className="map-container">
                        <ParkingMap facilities={[facility]} />
                    </div>
                </div>
            </div>
    </>
  );
}
