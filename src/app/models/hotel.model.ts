export interface Hotel {
  images: string[];
  title: string;
  overview: string;
  location: string;
  rating: number;
  price: number;
  sale?: number;
  newPrice?: number;
  rooms: string[];
  availability: { start: string; end: string }[];
  people: { adults: number; children: number };
  reviews: number; 
}
