import React, { useEffect, useRef, useState } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetch('http://localhost:8000/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data && data.email) setUser(data);
        });
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    navigate('/login');
  };

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm py-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center fw-bold">
        <img src={process.env.PUBLIC_URL + '/parkwise-logo.png'} alt="ParkWise Logo" style={{ height: '51px', width: '122px', marginRight: '10px' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav className="align-items-center">
            <Nav.Link as={Link} to="/all-parking" className="fw-semibold mx-2">FIND PARKING</Nav.Link>
            <Nav.Link as={Link} to="#" className="fw-semibold mx-2">ABOUT</Nav.Link>
            {user ? (
              <div style={{ position: 'relative' }} ref={dropdownRef}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    background: '#d1d1d1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    color: '#888',
                    fontSize: 18,
                    cursor: 'pointer',
                  }}
                  onClick={() => setDropdownOpen(v => !v)}
                ></div>
                {dropdownOpen && (
                  <div style={{
                    position: 'absolute',
                    top: 48,
                    right: 0,
                    minWidth: 260,
                    background: '#18191c',
                    color: '#fff',
                    borderRadius: 16,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                    padding: 0,
                    zIndex: 1000,
                  }}>
                    <div style={{ padding: '18px 20px 6px 20px', fontWeight: 700, fontSize: 17, color: '#fff' }}>{user.name || 'User'}</div>
                    <div style={{ padding: '0 20px 12px 20px', fontSize: 14, color: '#bdbdbd' }}>{user.email}</div>
                    <div style={{ padding: '10px 20px', fontSize: 15, cursor: 'pointer', color: '#fff', borderTop: '1px solid #232428' }}>
                      Download for Windows
                    </div>
                    <div style={{ borderTop: '1px solid #232428', margin: '0 0 0 0' }}></div>
                    <div
                      style={{
                        padding: '14px 20px',
                        fontWeight: 600,
                        color: '#fff',
                        fontSize: 15,
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        justifyContent: 'space-between',
                      }}
                      onClick={handleLogout}
                    >
                      Log Out <span style={{ fontSize: 18, marginLeft: 8, color: '#bdbdbd' }}>&#8594;</span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Button as={Link} to="/login" className="px-4 fw-semibold mx-2" variant="primary">LOGIN</Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header; 