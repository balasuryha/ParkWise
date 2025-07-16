import { useLocation, useNavigate, Link } from 'react-router-dom';
import './Reserve.css';
import { useAuth } from '../context/AuthContext';

export default function Reserve() {
    const { user } = useAuth();
     const location = useLocation();
    const navigate = useNavigate();
    const parking = location.state?.parking;

    if (!user) {
        return (
            <div className="reserve-container">
            <p>Vous devez être connecté pour accéder à cette page.</p>
            <Link to="/login">Connexion</Link>
            </div>
        );
    }
    if (!parking) {
        return (
        <div className="reserve-container">
            <p>Aucune réservation sélectionnée.</p>
            <button onClick={() => navigate('/')}>Retour à l'accueil</button>
        </div>
        );
    }

    return (
        <div className="reserve-container">
        <h2>Réservation confirmée ✅</h2>
        <p><strong>Parking:</strong> {parking.name}</p>
        <p><strong>Adresse:</strong> {parking.address}</p>
        <p><strong>Places restantes:</strong> {parking.available - 1}</p>
        <p>Merci d’avoir réservé avec ParkWise !</p>
        <button onClick={() => navigate('/')}>Revenir à l'accueil</button>
        </div>
    );
}
