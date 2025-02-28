import axios from 'axios';

const AIRBNB_API_KEY = process.env.REACT_APP_AIRBNB_API_KEY;
const BOOKING_API_KEY = process.env.REACT_APP_BOOKING_API_KEY;
const EXPEDIA_API_KEY = process.env.REACT_APP_EXPEDIA_API_KEY;

/**
 * Hotel API Service
 * Handles all API interactions with different hotel providers
 */

/**
 * Fetches properties from Airbnb API
 * @param {string} location - Location to search for
 * @returns {Promise<Array>} Array of normalized property objects
 */
const fetchAirbnbProperties = async (location) => {
  try {
    const response = await axios.get(`https://api.airbnb.com/v2/search_results`, {
      params: {
        location,
        amenities: ['family_friendly'],
        price_max: 1000,
        price_min: 0,
        sort: 'rating',
      },
      headers: {
        'Authorization': `Bearer ${AIRBNB_API_KEY}`,
      }
    });
    return response.data.search_results.map(property => ({
      id: `airbnb-${property.id}`,
      source: 'Airbnb',
      name: property.name,
      image: property.picture_url,
      price: property.price.total,
      rating: property.rating,
      amenities: property.amenities,
      url: property.listing_url
    }));
  } catch (error) {
    console.error('Airbnb API error:', error);
    return [];
  }
};

/**
 * Fetches properties from Booking.com API
 * @param {string} location - Location to search for
 * @returns {Promise<Array>} Array of normalized property objects
 */
const fetchBookingProperties = async (location) => {
  try {
    const response = await axios.get(`https://distribution-xml.booking.com/2.0/json/hotels`, {
      params: {
        city: location,
        extras: 'hotel_facilities',
        filter: 'family_friendly:true',
      },
      headers: {
        'Authorization': `Bearer ${BOOKING_API_KEY}`,
      }
    });
    return response.data.result.map(hotel => ({
      id: `booking-${hotel.hotel_id}`,
      source: 'Booking.com',
      name: hotel.hotel_name,
      image: hotel.max_photo_url,
      price: hotel.min_total_price,
      rating: hotel.review_score / 2,
      amenities: hotel.hotel_facilities,
      url: hotel.url
    }));
  } catch (error) {
    console.error('Booking.com API error:', error);
    return [];
  }
};

/**
 * Fetches properties from Expedia API
 * @param {string} location - Location to search for
 * @returns {Promise<Array>} Array of normalized property objects
 */
const fetchExpediaProperties = async (location) => {
  try {
    const response = await axios.get(`https://hotels.api.expedia.com/hotels/search`, {
      params: {
        location,
        amenities: 'FAMILY_FRIENDLY',
        sort: 'RATING',
      },
      headers: {
        'Authorization': `Bearer ${EXPEDIA_API_KEY}`,
      }
    });
    return response.data.hotels.map(hotel => ({
      id: `expedia-${hotel.id}`,
      source: 'Expedia',
      name: hotel.name,
      image: hotel.thumbnailUrl,
      price: hotel.price.total,
      rating: hotel.rating,
      amenities: hotel.amenities,
      url: hotel.deepLink
    }));
  } catch (error) {
    console.error('Expedia API error:', error);
    return [];
  }
};

/**
 * Fetches properties from all supported providers
 * @param {string} location - Location to search for
 * @returns {Promise<Array>} Combined and sorted array of properties
 */
export const fetchAllProperties = async (location) => {
  try {
    const [airbnbResults, bookingResults, expediaResults] = await Promise.all([
      fetchAirbnbProperties(location),
      fetchBookingProperties(location),
      fetchExpediaProperties(location)
    ]);

    // Combine all results and sort by rating
    const allProperties = [...airbnbResults, ...bookingResults, ...expediaResults]
      .sort((a, b) => b.rating - a.rating);

    return allProperties;
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
};

// Helper function to normalize location names
export const normalizeLocation = (location) => {
  const locationMap = {
    'cyprus': 'Cyprus',
    'rome': 'Rome, Italy',
    'new-york': 'New York, United States',
    'spain': 'Spain',
    'paris': 'Paris, France'
  };
  
  return locationMap[location.toLowerCase()] || location;
};