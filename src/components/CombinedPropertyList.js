import React from 'react';

/**
 * CombinedPropertyList Component
 * Renders a grid of property cards from multiple sources (Airbnb, Booking.com, Expedia)
 * 
 * @component
 * @param {Object[]} properties - Array of property objects from different sources
 * @param {string} properties[].id - Unique identifier for the property
 * @param {string} properties[].source - Source platform (Airbnb, Booking.com, Expedia)
 * @param {string} properties[].image - URL of the property image
 * @param {string} properties[].name - Name of the property
 * @param {number} properties[].rating - Rating of the property (0-5)
 * @param {number} properties[].price - Price per night
 * @param {string[]} properties[].amenities - Array of available amenities
 * @param {string} properties[].url - Booking URL for the property
 */
const CombinedPropertyList = ({ properties }) => {
  return (
    <div className="property-grid">
      {properties.map((property) => (
        <div key={property.id} className="property-card">
          {/* Source badge shows the platform (Airbnb, Booking, etc.) */}
          <div className="source-badge">{property.source}</div>
          
          {/* Property image */}
          <img src={property.image} alt={property.name} />
          
          <div className="property-info">
            {/* Property name */}
            <h3>{property.name}</h3>
            
            {/* Star rating display */}
            <div className="rating">
              {'★'.repeat(Math.round(property.rating))}
              {'☆'.repeat(5 - Math.round(property.rating))}
              <span className="rating-number">({property.rating.toFixed(1)})</span>
            </div>
            
            {/* Price per night */}
            <p className="price">${property.price}/night</p>
            
            {/* Display first 3 amenities */}
            <div className="family-features">
              {property.amenities.slice(0, 3).map((amenity, index) => (
                <span key={index} className="amenity-tag">{amenity}</span>
              ))}
            </div>
            
            {/* Booking link */}
            <a 
              href={property.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="book-button"
            >
              View Deal
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CombinedPropertyList;