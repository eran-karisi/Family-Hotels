import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import { searchProperties } from './services/airbnbApi';
import PropertyList from './components/PropertyList';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery) return;
    
    setIsLoading(true);
    try {
      const results = await searchProperties(searchQuery);
      setProperties(results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="main-header">
        <nav>
          <div className="logo">Family Hotels</div>
          <ul className="nav-links">
            <li><a href="#destinations">Destinations</a></li>
            <li><a href="#deals">Special Deals</a></li>
            <li><a href="#family-tips">Family Tips</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="hero">
          <h1>Find Your Perfect Family Vacation</h1>
          <p>Discover family-friendly hotels and resorts worldwide</p>
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Where would you like to go?" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button 
              className="search-button" 
              onClick={handleSearch}
              disabled={isLoading}
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </section>

        {isLoading ? (
          <div className="loading">Loading properties...</div>
        ) : properties.length > 0 ? (
          <section className="search-results">
            <h2>Family-Friendly Properties in {searchQuery}</h2>
            <PropertyList properties={properties} />
          </section>
        ) : null}

        <section className="featured-destinations">
          <h2>Popular Family Destinations</h2>
          <div className="destination-grid">
            {/* We'll add destination cards here later */}
          </div>
        </section>

        <section className="why-choose-us">
          <h2>Why Choose Us</h2>
          <div className="features">
            <div className="feature">
              <h3>Family-Verified</h3>
              <p>All hotels are verified for family-friendliness</p>
            </div>
            <div className="feature">
              <h3>Best Prices</h3>
              <p>Guaranteed best rates for families</p>
            </div>
            <div className="feature">
              <h3>Kid-Friendly Activities</h3>
              <p>Hotels with dedicated children's programs</p>
            </div>
          </div>
        </section>
      </main>

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
          <p>&copy; 2024 Family Hotels Affiliate. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
