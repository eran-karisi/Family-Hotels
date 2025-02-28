const https = require('https');
const fs = require('fs');
const path = require('path');

const locationImages = {
  cyprus: {
    url: 'https://images.unsplash.com/photo-1529686342540-1b43aec0df75?auto=format&fit=crop&w=1200',
    alt: 'Beautiful Cyprus beach with clear blue water'
  },
  rome: {
    url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200',
    alt: 'Rome Colosseum during sunset'
  },
  'new-york': {
    url: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200',
    alt: 'New York City skyline with Central Park'
  },
  spain: {
    url: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1200',
    alt: 'Park Guell in Barcelona, Spain'
  },
  paris: {
    url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200',
    alt: 'Eiffel Tower in Paris'
  },
  'greek-islands': {
    url: 'https://images.unsplash.com/photo-1515859005217-8a1f08870f59?auto=format&fit=crop&w=1200',
    alt: 'Beautiful Santorini island with white buildings and blue domes'
  }
};

const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
};

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    const imagesDir = path.join(__dirname, '../public/images');
    ensureDirectoryExists(imagesDir);
    
    const filepath = path.join(imagesDir, filename);
    const file = fs.createWriteStream(filepath);

    console.log(`Starting download of ${filename}`);

    https.get(url, response => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${filename}: ${response.statusCode}`));
        return;
      }

      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Successfully downloaded: ${filename}`);
        resolve();
      });

      file.on('error', (err) => {
        fs.unlink(filepath, () => {});
        console.error(`ERROR downloading ${filename}: ${err.message}`);
        reject(err);
      });
    }).on('error', err => {
      fs.unlink(filepath, () => {});
      console.error(`ERROR with HTTP request for ${filename}: ${err.message}`);
      reject(err);
    });
  });
};

async function downloadAllImages() {
  console.log('Starting image downloads process...');
  
  try {
    const downloads = Object.entries(locationImages).map(([location, data]) => 
      downloadImage(data.url, `${location}.jpg`)
    );
    
    await Promise.all(downloads);
    console.log('All images downloaded successfully!');
  } catch (error) {
    console.error('FATAL ERROR:', error.message);
    process.exit(1);
  }
}

downloadAllImages();
