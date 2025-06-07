
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../constants';
import { BirthdayImage } from '../types';

// Fallback data in case Supabase is not configured or returns no images.
// This helps in visualizing the layout.
const fallbackImages: BirthdayImage[] = [
  { id: '1', name: 'แฟนของฉัน Img 1', image_url: 'https://pkqtnhirpcxpaqmcaack.supabase.co/storage/v1/object/public/birthday-images//img1.jpg', created_at: new Date().toISOString() },
  { id: '2', name: 'แฟนของฉัน Img 2', image_url: 'https://pkqtnhirpcxpaqmcaack.supabase.co/storage/v1/object/public/birthday-images//img2.jpg', created_at: new Date().toISOString() },
  { id: '3', name: 'แฟนของฉัน Img 3', image_url: 'https://pkqtnhirpcxpaqmcaack.supabase.co/storage/v1/object/public/birthday-images//img3.png', created_at: new Date().toISOString() },
  { id: '4', name: 'แฟนของฉัน Img 4', image_url: 'https://pkqtnhirpcxpaqmcaack.supabase.co/storage/v1/object/public/birthday-images//img4.jpg', created_at: new Date().toISOString() },
  { id: '5', name: 'แฟนของฉัน Img 5', image_url: 'https://pkqtnhirpcxpaqmcaack.supabase.co/storage/v1/object/public/birthday-images//img5.jpg', created_at: new Date().toISOString() },
  { id: '6', name: 'แฟนของฉัน Img 6', image_url: 'https://pkqtnhirpcxpaqmcaack.supabase.co/storage/v1/object/public/birthday-images//img6.jpg', created_at: new Date().toISOString() },
  { id: '7', name: 'แฟนของฉัน Img 7', image_url: 'https://pkqtnhirpcxpaqmcaack.supabase.co/storage/v1/object/public/birthday-images//img7.jpg', created_at: new Date().toISOString() },
  { id: '8', name: 'Sample Image 8', image_url: 'https://picsum.photos/seed/bday8/600/400', created_at: new Date().toISOString() },
];

export const fetchBirthdayImages = async (): Promise<BirthdayImage[]> => {
  if (SUPABASE_URL === 'YOUR_SUPABASE_URL' || SUPABASE_ANON_KEY === 'YOUR_SUPABASE_ANON_KEY') {
    console.warn('Supabase URL or Anon Key not configured. Using fallback images.');
    return new Promise((resolve) => setTimeout(() => resolve(fallbackImages), 500));
  }

  try {
    // The 'birthday_images' table name should match what you created in Supabase.
    // This fetches all columns, ordered by creation_date descending.
    const response = await fetch(`${SUPABASE_URL}/rest/v1/birthday_images?select=*&order=created_at.desc`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Supabase fetch error:', errorData);
      throw new Error(`Failed to fetch images from Supabase: ${errorData.message || response.statusText}`);
    }

    const data: BirthdayImage[] = await response.json();
    
    if (data.length === 0) {
      console.warn('No images found in Supabase. Consider adding some to the `birthday_images` table. Using fallback images.');
      return fallbackImages; // Return fallback if Supabase returns empty
    }
    return data;
  } catch (error) {
    console.error('Error fetching birthday images:', error);
    // Return fallback images on error to ensure the page still looks okay.
    // You might want to handle this differently in a production app (e.g., show a specific error message).
    return new Promise((resolve) => setTimeout(() => resolve(fallbackImages), 100)); // Return fallback on error
  }
};
