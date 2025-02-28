const AIRBNB_AFFILIATE_ID = 'YOUR_AIRBNB_AFFILIATE_ID';
const BOOKING_AFFILIATE_ID = 'YOUR_BOOKING_AFFILIATE_ID';
const EXPEDIA_AFFILIATE_ID = 'YOUR_EXPEDIA_AFFILIATE_ID';

const API_URLS = {
  airbnb: 'https://api.airbnb.com/v2',
  booking: 'https://distribution-xml.booking.com/json/bookings',
  expedia: 'https://api.ean.com/v3'
};

const searchAirbnb = async (location) => {
  try {
    const response = await fetch(
      `${API_URLS.airbnb}/search_results?location=${location}&affiliate_id=${AIRBNB_AFFILIATE_ID}&amenities[]=family_friendly`,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    const data = await response.json();
    return data.search_results.map(property => ({
      id: `airbnb_${property.id}`,
      source: 'Airbnb',
      name: property.name,
      rating: property.rating || 0,
      price: property.price,
      image: property.picture_url,
      amenities: property.amenities,
      url: property.listing_url,
      location: property.location
    }));
  } catch (error) {
    console.error('Airbnb API error:', error);
    return [];
  }
};

const searchBooking = async (location) => {
  try {
    const response = await fetch(
      `${API_URLS.booking}/getHotels?city=${location}&affiliate_id=${BOOKING_AFFILIATE_ID}&family_rooms=1`,
      {
        headers: {
          'Authorization': 'Bearer YOUR_BOOKING_API_KEY',
          'Content-Type': 'application/json',
        }
      }
    );
    const data = await response.json();
    return data.hotels.map(hotel => ({
      id: `booking_${hotel.hotel_id}`,
      source: 'Booking.com',
      name: hotel.name,
      rating: hotel.review_score / 2, // Converting to 5-star scale
      price: hotel.min_rate,
      image: hotel.main_photo_url,
      amenities: hotel.facilities,
      url: hotel.url,
      location: hotel.location
    }));
  } catch (error) {
    console.error('Booking.com API error:', error);
    return [];
  }
};

const searchExpedia = async (location) => {
  try {
    const response = await fetch(
      `${API_URLS.expedia}/properties/search?location=${location}&affiliate_id=${EXPEDIA_AFFILIATE_ID}&amenities=FAMILY_FRIENDLY`,
      {
        headers: {
          'Authorization': 'Bearer YOUR_EXPEDIA_API_KEY',
          'Content-Type': 'application/json',
        }
      }
    );
    const data = await response.json();
    return data.properties.map(property => ({
      id: `expedia_${property.id}`,
      source: 'Expedia',
      name: property.name,
      rating: property.rating,
      price: property.price.total,
      image: property.images[0]?.url,
      amenities: property.amenities,
      url: property.deeplink,
      location: property.location
    }));
  } catch (error) {
    console.error('Expedia API error:', error);
    return [];
  }
};

export const searchAllProperties = async (location) => {
  try {
    // Fetch from all sources concurrently
    const [airbnbResults, bookingResults, expediaResults] = await Promise.all([
      searchAirbnb(location),
      searchBooking(location),
      searchExpedia(location)
    ]);

    // Combine and sort results by rating (highest first)
    const allResults = [...airbnbResults, ...bookingResults, ...expediaResults]
      .sort((a, b) => b.rating - a.rating);

    return allResults;
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
};

// Helper function to filter family-friendly properties
export const filterFamilyFriendly = (properties) => {
  return properties.filter(property => {
    const familyAmenities = [
      'family friendly',
      'kids club',
      'children activities',
      'baby sitting',
      'family rooms',
      'playground'
    ];
    
    return property.amenities.some(amenity => 
      familyAmenities.some(familyAmenity => 
        amenity.toLowerCase().includes(familyAmenity)
      )
    );
  });
};