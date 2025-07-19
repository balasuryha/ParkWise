import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export default function MapboxMap({ facilities = [] }) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [2.3522, 48.8566], // default Paris
      zoom: 12,
    });

    return () => map.current.remove();
  }, []);

  useEffect(() => {
    if (!map.current || !facilities.length) return;

    facilities.forEach((place) => {
      if (!place.location) return;
      new mapboxgl.Marker()
        .setLngLat([place.location[1], place.location[0]])
        .setPopup(new mapboxgl.Popup().setHTML(`<b>${place.name}</b>`))
        .addTo(map.current);
    });
  }, [facilities]);

  return <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />;
}
