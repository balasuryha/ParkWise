import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    // Check for ?registered=1 in query params
    const params = new URLSearchParams(location.search);
    if (params.get('registered') === '1') {
      setSuccessMsg('Successfully registered! Please log in.');
    }
    // Also support localStorage flag (for direct window.location.href)
    if (localStorage.getItem('showRegisteredMsg')) {
      setSuccessMsg('Successfully registered! Please log in.');
      localStorage.removeItem('showRegisteredMsg');
    }
  }, [location.search]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          password: form.password
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Login failed');
      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        localStorage.setItem('user_email', data.user_email);
        localStorage.setItem('subscription', data.subscription);
        window.location.href = '/'; // Reload to update Header
        // navigate('/');
      } else {
        throw new Error('No token received');
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="login-bg">
      <div className="login-container">
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <img src={process.env.PUBLIC_URL + '/parkwise-logo.png'} alt="ParkWise" className="login-logo" />
          <h2 className="login-title">Welcome Back</h2>
        </div>
        {successMsg && <div className="login-success" style={{ color: 'green', marginBottom: 16, textAlign: 'center', fontWeight: 600 }}>{successMsg}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 18 }}>
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="login-input"
              required
            />
          </div>
          <div style={{ marginBottom: 8 }}>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="login-input"
              required
            />
          </div>
          <div style={{ textAlign: 'right', marginBottom: 18 }}>
            <a href="#" className="login-forgot">Forgot password?</a>
          </div>
          {error && <div className="login-error">{error}</div>}
          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            Log In
          </button>
          <div className="login-bottom">
            Don't have an account?{' '}
            <Link to="/signup" className="login-signup-link">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
} 