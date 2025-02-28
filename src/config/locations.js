/**
 * Predefined Locations Configuration
 * Defines the available destinations and their properties
 * 
 * @type {Array<Object>}
 * @property {string} id - Unique identifier for the location
 * @property {string} name - Display name of the location
 * @property {string} path - URL path for routing
 * @property {string} imageUrl - Path to the location's hero image
 * @property {string} alt - Alt text for the location image
 */
export const PREDEFINED_LOCATIONS = [
  {
    id: 'cyprus',
    name: 'Cyprus',
    path: '/cyprus',
    imageUrl: '/images/cyprus.jpg',
    alt: 'Beautiful Cyprus beach with clear blue water',
    description: "Cyprus offers the perfect blend of family-friendly beaches, safe swimming areas, and fascinating ancient ruins. With year-round sunshine, water parks, and interactive historical sites, it's an ideal destination for families seeking both relaxation and cultural experiences."
  },
  {
    id: 'rome',
    name: 'Rome',
    path: '/rome',
    imageUrl: '/images/rome.jpg',
    alt: 'Rome Colosseum during sunset',
    description: "Rome brings history to life for children with its incredible monuments, interactive museums, and delicious kid-friendly cuisine. From gladiator schools to pizza-making classes, families can enjoy hands-on experiences while exploring this ancient city."
  },
  {
    id: 'new-york',
    name: 'New York',
    path: '/new-york',
    imageUrl: '/images/new-york.jpg',
    alt: 'New York City skyline with Central Park',
    description: "New York City offers endless family adventures, from Central Park's playgrounds to world-class museums designed for children. With Broadway shows, boat rides, and famous landmarks, every day brings new excitement for families."
  },
  {
    id: 'spain',
    name: 'Spain',
    path: '/spain',
    imageUrl: '/images/spain.jpg',
    alt: 'Park Guell in Barcelona, Spain',
    description: "Spain welcomes families with its warm culture, safe beaches, and child-friendly attractions. From Barcelona's whimsical architecture to water parks and interactive science museums, Spain offers activities for all ages in a family-oriented atmosphere."
  },
  {
    id: 'paris',
    name: 'Paris',
    path: '/paris',
    imageUrl: '/images/paris.jpg',
    alt: 'Eiffel Tower in Paris',
    description: "Paris isn't just for romance - it's a magical destination for families. With Disneyland Paris nearby, kid-friendly museums like the Science Museum, and parks scattered throughout the city, children will be enchanted by the City of Light."
  },
  {
    id: 'greek-islands',
    name: 'Greek Islands',
    path: '/greek-islands',
    imageUrl: '/images/greek-islands.jpg',
    alt: 'Beautiful Santorini island with white buildings and blue domes',
    description: "The Greek Islands provide a perfect family escape with their safe, shallow beaches, family-run tavernas, and fascinating mythology tours. Children can explore ancient ruins, learn about Greek myths, and enjoy water activities in crystal-clear waters."
  }
];