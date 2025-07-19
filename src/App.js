import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ParkingPage from './pages/ParkingPage';
import ParkingDetailPage from './pages/ParkingDetailPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/parking" element={<ParkingPage />} />
      <Route path="/parking/:id" element={<ParkingDetailPage />} />
    </Routes>
  );
}

export default App;
