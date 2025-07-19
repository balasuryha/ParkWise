const BASE_URL = process.env.REACT_APP_API_URL;

export const fetchFacilities = async () => {
  const res = await fetch(`${BASE_URL}/facilities`);
  return await res.json();
};

export const fetchPredict = async (id) => {
  const res = await fetch(`${BASE_URL}/predict/${id}`);
  return await res.json();
};

export const fetchStatus = async (id) => {
  const res = await fetch(`${BASE_URL}/status/${id}`);
  return await res.json();
};

export const fetchEventsNearby = async (lat, lon) => {
  const res = await fetch(`${BASE_URL}/events/nearby?lat=${lat}&lon=${lon}`);
  return await res.json();
};

export const fetchRecommendations = async (lat, lon) => {
  const res = await fetch(`${BASE_URL}/recommendations?lat=${lat}&lon=${lon}`);
  return await res.json();
};

export const downloadForecastCSV = (id) => {
  window.open(`${BASE_URL}/forecast/${id}/csv`, '_blank');
};
