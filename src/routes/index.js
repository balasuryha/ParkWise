import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Reserve from '../pages/Reserve';
import MyReservations from '../pages/MyReservations';
import HowItWorks from '../pages/HowItWorks';
import ParkingPage from '../pages/ParkingPage';
import Contact from '../pages/Contact';
import SearchResultsPage from '../pages/SearchResultsPage';


export default function AppRoutes() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reserve" element={<Reserve />} />
        <Route path="/my-reservations" element={<MyReservations />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/parking" element={<ParkingPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/search" element={<SearchResultsPage />} />

      </Routes>
      <Footer />
    </Router>
  );
}
