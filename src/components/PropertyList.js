import React from 'react';

const PropertyList = ({ properties }) => {
  return (
    <div className="property-grid">
      {properties.map((property) => (
        <div key={property.id} className="property-card">
          <img src={property.picture_url} alt={property.name} />
          <div className="property-info">
            <h3>{property.name}</h3>
            <p>{property.property_type} · {property.bedrooms} bedrooms</p>
            <p className="price">${property.price}/night</p>
            <div className="family-features">
              {property.amenities.map((amenity, index) => (
                <span key={index} className="amenity-tag">{amenity}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;