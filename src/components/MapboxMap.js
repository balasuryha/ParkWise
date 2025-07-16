import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import './MapBoxMap.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibWFuaXNoYXJhaSIsImEiOiJjbWQxcm5lbmkxZWR2MmtxdHQzeWh6bWdkIn0._i4dqXp29J2WA1LtAMwAWw'; // replace this with your token

export default function MapboxMap({ parkings }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [2.3522, 48.8566], // Default to Paris
      zoom: 12
    });

    parkings.forEach((p) => {
      const [lat, lng] = p.location || [];
      if (!isNaN(lat) && !isNaN(lng)) {
        const el = document.createElement('div');
        el.className = 'map-marker';
        el.innerHTML = `<span>${p.available} spots</span>`;

        new mapboxgl.Marker(el)
          .setLngLat([lng, lat])
          .addTo(map);
      } else {
        console.warn('Invalid location:', p);
      }
    });

    return () => map.remove();

  }, [parkings]);

  return <div className="map-container" ref={mapRef} />;
}
