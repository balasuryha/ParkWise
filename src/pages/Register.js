import React, { useState } from 'react';
import '../styles/Auth.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const { login } = useAuth();       // ✅ get login from context
  const navigate = useNavigate();    // ✅ for redirection

  const handleRegister = (e) => {
    e.preventDefault();

    if (!email || !password || !confirm) {
      alert('Tous les champs sont obligatoires');
      return;
    }

    if (password !== confirm) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    // ✅ simulate successful registration → log in + redirect
    login(email);
    navigate('/');
  };

  return (
    <div className="auth-container">
      <h2>Inscription</h2>
      <form onSubmit={handleRegister}>
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
        <input
          type="password"
          placeholder="Confirmer le mot de passe"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        <button type="submit">S'inscrire</button>
      </form>
      <p>Déjà inscrit ? <Link to="/login">Connectez-vous</Link></p>
    </div>
  );
}
