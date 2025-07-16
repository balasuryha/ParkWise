import React, { useState } from 'react';
import '../styles/Auth.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // ✅ useAuth import

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();      // ✅ get login method
  const navigate = useNavigate();   // ✅ hook to redirect

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    // ✅ simulate login & redirect
    login(email);
    navigate('/');
  };

  return (
    <div className="auth-container">
      <h2>Connexion</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Adresse e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Se connecter</button>
      </form>
      <p>Pas encore de compte ? <Link to="/register">Inscrivez-vous</Link></p>
    </div>
  );
}
