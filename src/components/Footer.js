import React from 'react';
import './Footer.css';
import { FaFacebook, FaInstagram, FaXTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h2>ParkWise</h2>
          <div className="store-badges">
            <img src="/assets/appstore.png" alt="App Store" />
            <img src="/assets/googleplay.png" alt="Google Play" />
          </div>
        </div>

        <div className="footer-columns">
          <div>
            <h4>ParkWise</h4>
            <ul>
              <li>About us</li>
              <li>Careers</li>
              <li>Press</li>
            </ul>
          </div>
          <div>
            <h4>For Partners</h4>
            <ul>
              <li>Business Parking</li>
              <li>Electric Cars</li>
              <li>Shared Access</li>
            </ul>
          </div>
          <div>
            <h4>Help</h4>
            <ul>
              <li>How it works</li>
              <li>Contact us</li>
              <li>Terms / Privacy</li>
            </ul>
          </div>
        </div>

        <div className="newsletter">
          <p>Receive our best deals:</p>
          <form>
            <input type="email" placeholder="Your email" />
            <button type="submit">OK</button>
          </form>
          <div className="social-icons">
            <FaInstagram /><FaFacebook /><FaXTwitter /><FaLinkedin /><FaYoutube />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 ParkWise. All rights reserved.</p>
      </div>
    </footer>
  );
}
