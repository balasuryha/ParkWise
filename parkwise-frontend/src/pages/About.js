import React from 'react';
import { Container } from 'react-bootstrap';

export default function AboutUs() {
  return (
    <div className="about-container">
      <style>{`
        .about-container {
          background-color: #f9f9f9;
          padding: 3rem 1rem;
          color: #232227;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .about-container h2 {
          color: #765cd9;
          font-weight: 700;
        }

        .about-container p {
          font-size: 1.1rem;
          line-height: 1.7;
        }

        .about-container h3 {
          color: #393341;
          font-weight: 600;
          margin-top: 2.5rem;
        }

        .about-container ul {
          list-style: disc;
          padding-left: 1.5rem;
          font-size: 1rem;
          line-height: 1.6;
        }

        .about-container ul li {
          margin-bottom: 0.75rem;
        }
      `}</style>

      <Container>
        <h2 className="mb-4">About ParkWise</h2>
        <p>
          <strong>ParkWise</strong> is a smart urban mobility platform developed by a team of master's students passionate about solving real-world parking challenges using open data and advanced technologies. Our mission is to reduce parking stress, fuel consumption, and traffic congestion by offering real-time, intelligent parking insights.
        </p>
        <p>
          The app integrates municipal open datasets, predictive algorithms, and a user-friendly interface to help citizens make informed decisions. We aim to transform urban spaces into more efficient, accessible, and environmentally sustainable ecosystems.
        </p>

        <h3 className="mt-5 mb-3">Terms and Conditions</h3>
        <ul>
          <li>The data shown (parking availability, event disruptions, predictions) is collected from third-party public APIs and may not always be accurate.</li>
          <li>ParkWise does not guarantee parking availability and is not responsible for any delay, loss, or inconvenience resulting from the app usage.</li>
          <li>Users are expected to use the app responsibly and refrain from any misuse of data or services.</li>
          <li>We handle personal data (like email and location) according to data protection laws and never share it without consent.</li>
          <li>The app may undergo updates or maintenance without prior notice.</li>
          <li>For commercial inquiries or integration, please contact our development team.</li>
        </ul>
      </Container>
    </div>
  );
}
