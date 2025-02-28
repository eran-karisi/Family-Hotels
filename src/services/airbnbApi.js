const AFFILIATE_ID = 'YOUR_AFFILIATE_ID'; // Replace with your actual Airbnb affiliate ID
const API_BASE_URL = 'https://api.airbnb.com/v2';

export const searchProperties = async (location) => {
  try {
    const response = await fetch(`${API_BASE_URL}/search_results?location=${location}&affiliate_id=${AFFILIATE_ID}&amenities[]=family_friendly`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await response.json();
    return data.search_results;
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
};