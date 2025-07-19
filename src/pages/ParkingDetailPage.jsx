import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  fetchFacilities,
  fetchStatus,
  fetchPredict,
  fetchEventsNearby,
  fetchRecommendations,
  downloadForecastCSV,
} from '../services/api';
import MapboxMap from '../components/MapboxMap';
import RecommendationList from '../components/RecommendationList';
import EventList from '../components/EventList';
import Navbar from '../components/Navbar';

export default function ParkingDetailPage() {
  const { id } = useParams();
  const [facility, setFacility] = useState(null);
  const [status, setStatus] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [events, setEvents] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const all = await fetchFacilities();
      const selected = all.find(p => p.id.toString() === id);
      setFacility(selected);

      if (selected) {
        const [statusRes, predictRes, eventsRes, recsRes] = await Promise.all([
          fetchStatus(id),
          fetchPredict(id),
          fetchEventsNearby(selected.location[0], selected.location[1]),
          fetchRecommendations(selected.location[0], selected.location[1])
        ]);

        setStatus(statusRes);
        setForecast(predictRes);
        setEvents(eventsRes);
        setRecommendations(recsRes);
      }
    };
    loadData();
  }, [id]);

  if (!facility) return <p>Loading...</p>;

  const handleDirections = () => {
    const [lat, lon] = facility.location;
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`, '_blank');
  };

  return (
    <>
      <Navbar />
        <div className="parking-detail-page">
          <h2>{facility.name}</h2>
          <p>{facility.address}</p>

          <div className="availability">
            <strong>{status?.available || '—'} spots available</strong>
            <p>{forecast?.summary || ''}</p>
          </div>

          <section>
            <h3>Event Impact</h3>
            <EventList events={events} />
          </section>

          <section>
            <h3>Forecasted Occupancy (24 hrs)</h3>
            <button onClick={() => downloadForecastCSV(id)}>Download Forecast CSV</button>
            <img src={`http://localhost:5000/forecast/${id}/csv/graph.png`} alt="Forecast Graph" />
          </section>

          <section>
            <h3>Alternate Parking Recommendations</h3>
            <RecommendationList list={recommendations} />
          </section>

          <section>
            <h3>Location</h3>
            <MapboxMap facilities={[facility]} />
            <button onClick={handleDirections} className="directions-btn">Get Directions</button>
          </section>
        </div>
    </>
    
  );
}
