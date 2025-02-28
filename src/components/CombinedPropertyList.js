import React from 'react';

const CombinedPropertyList = ({ properties }) => {
  return (
    <div className="property-grid">
      {properties.map((property) => (
        <div key={property.id} className="property-card">
          <div className="source-badge">{property.source}</div>
          <img src={property.image} alt={property.name} />
          <div className="property-info">
            <h3>{property.name}</h3>
            <div className="rating">
              {'★'.repeat(Math.round(property.rating))}
              {'☆'.repeat(5 - Math.round(property.rating))}
              <span className="rating-number">({property.rating.toFixed(1)})</span>
            </div>
            <p className="price">${property.price}/night</p>
            <div className="family-features">
              {property.amenities.slice(0, 3).map((amenity, index) => (
                <span key={index} className="amenity-tag">{amenity}</span>
              ))}
            </div>
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