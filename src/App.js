import logo from './logo.svg';
//import React, { useState } from 'react';
import './App.css';
import { searchProperties } from './services/airbnbApi';
import PropertyList from './components/PropertyList';
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import { PREDEFINED_LOCATIONS } from './config/locations';
//import LocationPage from './components/LocationPage';

/**
 * Main Application Component
 * Handles routing and main layout structure
 * 
 * @component
 * @uses {Router} - React Router for navigation
 * @uses {PREDEFINED_LOCATIONS} - Available destinations configuration
 */
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PREDEFINED_LOCATIONS } from './config/locations';
import LocationPage from './components/LocationPage';
import './App.css';

/**
 * Navigation Component
 * Renders the main navigation header with location links
 * 
 * @param {Object[]} locations - Array of available locations
 */
const Navigation = ({ locations }) => (
  <header className="main-header">
    <nav>
      <div className="logo">Family Hotels</div>
      <ul className="nav-links">
        {locations.map(location => (
          <li key={location.id}>
            <a href={location.path}>{location.name}</a>
          </li>
        ))}
      </ul>
    </nav>
  </header>
);

/**
 * Home Component
 * Renders the landing page with destination grid
 * 
 * @param {Object[]} locations - Array of available locations
 */
const Home = ({ locations }) => (
  <main>
    <section className="hero">
      <h1>Choose Your Family Vacation Destination</h1>
      <div className="destinations-grid">
        {locations.map(location => (
          <a key={location.id} href={location.path} className="destination-card">
            <img src={location.imageUrl} alt={location.alt} />
            <h2>{location.name}</h2>
          </a>
        ))}
      </div>
    </section>
  </main>
);

/**
 * Footer Component
 * Renders the global footer with contact information
 */
const Footer = () => (
  <footer>
    <div className="footer-content">
      <div className="footer-section">
        <h4>About Us</h4>
        <p>Helping families find their perfect vacation spots</p>
      </div>
      <div className="footer-section">
        <h4>Contact</h4>
        <p>Email: info@familyhotels.com</p>
      </div>
    </div>
    <div className="footer-bottom">
      <p>&copy; {new Date().getFullYear()} Family Hotels Affiliate. All rights reserved.</p>
    </div>
  </footer>
);

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navigation locations={PREDEFINED_LOCATIONS} />
        
        <Routes>
          <Route path="/" element={<Home locations={PREDEFINED_LOCATIONS} />} />
          <Route path="/:locationId" element={<LocationPage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
