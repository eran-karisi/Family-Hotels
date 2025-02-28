import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PREDEFINED_LOCATIONS } from '../config/locations';
import CombinedPropertyList from './CombinedPropertyList';
import { fetchAllProperties } from '../services/hotelApi';

const LocationPage = () => {
  const { locationId } = useParams();
  const [properties, setProperties] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const loadProperties = async () => {
      setLoading(true);
      try {
        const data = await fetchAllProperties(locationId);
        setProperties(data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, [locationId]);

  const location = PREDEFINED_LOCATIONS.find(loc => loc.id === locationId);

  // Fix image URL by removing PUBLIC_URL as images are served from the public directory
  const imageUrl = location?.imageUrl || '';

  return (
    <div>
      <div 
        className="location-hero loaded" 
        style={{ 
          backgroundImage: `url(${imageUrl})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <h1>{location?.name}</h1>
      </div>
      
      <div className="location-description">
        <p>{location?.description}</p>
      </div>

      {isLoading ? (
        <div className="loading">Loading properties...</div>
      ) : (
        <CombinedPropertyList properties={properties} />
      )}
    </div>
  );
};

export default LocationPage;