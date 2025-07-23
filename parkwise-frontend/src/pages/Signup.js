import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('free'); // 'free' or 'premium'

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNext = (e) => {
    e.preventDefault();
    setError('');
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agreeToTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy.');
      return;
    }
    setStep(2);
  };

  const handleSignup = async (subscription) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          subscription
        })
      });
      if (!res.ok) throw new Error('Signup failed');
      // Redirect to dashboard or show success
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleRegister = () => {
    setLoading(true);
    setError('');
    fetch(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        subscription: selectedPlan
      })
    })
      .then(async res => {
        if (!res.ok) {
          let msg = 'Signup failed';
          try {
            const data = await res.json();
            if (data.detail) msg = data.detail;
          } catch {}
          throw new Error(msg);
        }
        window.location.href = '/dashboard';
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        padding: '40px',
        width: '100%',
        maxWidth: '800px',
        position: 'relative',
        overflow: 'hidden',
        margin: '0 auto',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <img src={process.env.PUBLIC_URL + '/parkwise-logo.png'} alt="ParkWise Logo" style={{ height: '51px', width: '122px', marginRight: '10px' }} />
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#2c3e50', margin: '0', marginBottom: '5px' }}>
            Get Started with ParkWise
          </h1>
          <p style={{ fontSize: '14px', color: '#7f8c8d', margin: '0' }}>
            Find the perfect parking spot in Paris
          </p>
        </div>
        {step === 1 && (
          <form onSubmit={handleNext}>
            <div style={{ marginBottom: '20px' }}>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = '#1886ff'}
                onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = '#1886ff'}
                onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = '#1886ff'}
                onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
              />
            </div>
            <div style={{ marginBottom: '25px' }}>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = '#1886ff'}
                onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
              />
            </div>
            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  style={{ marginRight: '10px', marginTop: '2px' }}
                />
                <span style={{ fontSize: '13px', color: '#6c757d', lineHeight: '1.4' }}>
                  I agree to the{' '}
                  <span style={{ color: '#1886ff', textDecoration: 'underline', cursor: 'pointer' }}>
                    Terms of Service
                  </span>{' '}
                  and{' '}
                  <span style={{ color: '#1886ff', textDecoration: 'underline', cursor: 'pointer' }}>
                    Privacy Policy
                  </span>
                </span>
              </label>
            </div>
            {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
            <button
              type="submit"
              style={buttonStyle}
            >
              Next
            </button>
            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <span style={{ fontSize: '14px', color: '#6c757d' }}>
                Already have an account?{' '}
              </span>
              <Link to="/login" style={{
                color: '#1886ff',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '14px'
              }}>
                Log in
              </Link>
            </div>
          </form>
        )}
        {step === 2 && (
          <div>
            <h2 style={{ textAlign: 'center', fontWeight: 700, fontSize: 22, marginBottom: 24 }}>Choose Your Plan</h2>
            <div style={{ display: 'flex', gap: 32, marginBottom: 24, justifyContent: 'center', alignItems: 'stretch' }}>
              <PlanCard
                title="FREE TRIAL"
                price={<span style={{ color: '#222', fontWeight: 700, fontSize: 14 }}>€0 for 7 days</span>}
                color="rgb(55, 144, 44)"
                features={[
                  { text: 'Real-time parking availability', check: true },
                  { text: 'Parking congestion forecasts (limited)', check: true },
                  { text: 'Access 3 zones per day', check: true },
                  { text: 'Event-aware predictions', check: false },
                  { text: 'Alerts or notifications', check: false },
                  { text: 'Multi-modal travel suggestions', check: false },
                ]}
                selected={selectedPlan === 'free'}
                onSelect={() => setSelectedPlan('free')}
              />
              <PlanCard
                title="PREMIUM"
                price={<span style={{ color: '#1976d2', fontWeight: 700, fontSize: 14 }}>€4.99/month or €49.99/year</span>}
                color="#1976d2"
                features={[
                  { text: 'Unlimited real-time parking data', check: true },
                  { text: 'Forecast parking using events (concerts, sports)', check: true },
                  { text: 'Congestion heatmaps + live map overlay', check: true },
                  { text: 'Smart suggestions: Park & Ride, metro switch', check: true },
                  { text: 'Event alerts + notifications', check: true },
                  { text: 'Access all zones', check: true },
                  { text: 'Exportable reports or trip planner', check: true },
                ]}
                selected={selectedPlan === 'premium'}
                onSelect={() => setSelectedPlan('premium')}
              />
            </div>
            {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, width: '100%' }}>
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#1976d2',
                  fontWeight: 600,
                  fontSize: 18,
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  padding: '0 12px 0 0',
                  outline: 'none',
                  transition: 'color 0.2s',
                }}
                onClick={() => setStep(1)}
                aria-label="Back"
                disabled={loading}
              >
                <span style={{ fontSize: 22, marginRight: 2, lineHeight: 1 }}>⟵</span> Back
              </button>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                <button
                  style={{ ...buttonStyle, background: '#1886ff', width: 180, minWidth: 0, maxWidth: 180, padding: '12px 0' }}
                  onClick={handleRegister}
                  disabled={loading}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PlanCard({ title, price, features, selected, onSelect, color }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      style={{
        ...planBoxStyle,
        border: selected ? '2px solid #1976d2' : (hover ? '2px solid #1565c0' : '2px solid #eee'),
        background: selected ? '#f0f6ff' : '#fff',
        minWidth: 280,
        maxWidth: 320,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.2s, border-color 0.2s',
        boxShadow: hover ? '0 4px 24px rgba(25,118,210,0.10)' : planBoxStyle.boxShadow,
        cursor: 'pointer',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onSelect}
    >
      {/* Angled Banner */}
      <div style={{
        background: color,
        color: '#fff',
        fontWeight: 700,
        fontSize: 18,
        textAlign: 'center',
        padding: '14px 0 10px 0',
        position: 'relative',
        transform: 'skew(-15deg)',
        marginBottom: 16,
        letterSpacing: 1,
        textTransform: 'uppercase',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}>
        <span style={{ display: 'inline-block', transform: 'skew(15deg)' }}>{title}</span>
      </div>
      <div style={{ marginBottom: 2, textAlign: 'center' }}>{price}</div>
      <ul style={{ ...featureListStyle, flex: 1 }}>
        {features.map((f, i) => (
          <li key={i}>
            <span style={f.check ? checkIcon : crossIcon}>{f.check ? '✔' : '✖'}</span> {f.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '14px 16px',
  border: '1px solid #e9ecef',
  borderRadius: '10px',
  fontSize: '14px',
  outline: 'none',
  transition: 'border-color 0.2s ease',
  boxSizing: 'border-box'
};

const buttonStyle = {
  width: '100%',
  padding: '16px',
  background: '#1886ff',
  color: 'white',
  border: 'none',
  borderRadius: '10px',
  fontSize: '16px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
  marginBottom: '20px'
};

const planBoxStyle = {
  flex: 1,
  background: '#f4f8ff',
  borderRadius: 10,
  padding: 20,
  textAlign: 'left',
  boxShadow: '0 1px 4px rgba(25,118,210,0.07)',
  minWidth: 180
};

const featureListStyle = {
  fontSize: 14,
  margin: '12px 0 16px 0',
  paddingLeft: 18,
  listStyle: 'none',
  color: '#333',
  lineHeight: 1.6
};

const checkIcon = { color: '#28a745', fontWeight: 700, marginRight: 6 };
const crossIcon = { color: '#d32f2f', fontWeight: 700, marginRight: 6 };

export default Signup; 