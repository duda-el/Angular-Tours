import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hotel } from '../models/hotel.model';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  private hotels: Hotel[] = [
    {
      images: ['/assets/hotels/hotel1.png', '/assets/hotels/hotel2.png', '/assets/hotels/hotel3.png'],
      title: 'Luxury Suites',
      overview:
        'Experience unparalleled luxury at Luxury Suites, where elegance meets comfort. Each suite features contemporary decor, spacious layouts, and state-of-the-art amenities. Guests can enjoy complimentary Czech champagne, private parking, and a late checkout. The onsite gym ensures you can maintain your fitness routine even while traveling, and flexible cancellation policies offer peace of mind for every guest. Ideal for business and leisure travelers alike, Luxury Suites promises a memorable stay in the heart of Prague.',
      location: 'Prague, Czech Republic',
      rating: 4.8,
      price: 120,
      sale: 10,
      newPrice: 108,
      rooms: ['Deluxe', 'Suite', 'Standard'],
      availability: [{ start: '2024-12-29', end: '2025-01-05' }],
      people: { adults: 3, children: 1 },
      reviews: 1200,
    },
    {
      images: ['/assets/hotels/hotel2.png', '/assets/hotels/hotel4.png', '/assets/hotels/hotel5.jpg'],
      title: 'Budget Inn',
      overview:
        'Budget Inn offers affordable comfort in the vibrant city of Paris. Guests can enjoy a complimentary glass of French champagne upon arrival, along with free parking and late checkout options. Each room is equipped with essential amenities to ensure a convenient stay. Located close to major attractions, Budget Inn is the perfect base for exploring the iconic landmarks and culture of Paris while enjoying unbeatable value.',
      location: 'Paris, France',
      rating: 4.2,
      price: 60,
      rooms: ['Single', 'Double'],
      availability: [{ start: '2024-12-01', end: '2024-12-13' }],
      people: { adults: 2, children: 0 },
      reviews: 100,
    },
    {
      images: ['/assets/hotels/hotel7.jpg', '/assets/hotels/hotel6.jpg', '/assets/hotels/hotel8.jpg'],
      title: 'Mediterranean Escape',
      overview:
        'Mediterranean Escape is a stunning beachfront property offering breathtaking sea views and exquisite Mediterranean cuisine. Each room is tastefully designed with comfort and relaxation in mind, featuring plush bedding and modern amenities. The property also boasts direct access to the beach, making it the ideal destination for sun-seekers and ocean lovers. Whether you’re looking to unwind or indulge in local flavors, Mediterranean Escape offers a unique getaway in Barcelona.',
      location: 'Barcelona, Spain',
      rating: 4.6,
      price: 150,
      rooms: ['Sea View', 'Suite', 'Standard'],
      availability: [{ start: '2024-12-15', end: '2024-11-18' }],
      people: { adults: 2, children: 1 },
      reviews: 300,
    },
    {
      images: ['/assets/hotels/hotel4.png', '/assets/hotels/hotel5.jpg', '/assets/hotels/hotel6.jpg'],
      title: 'City Lights Hotel',
      overview:
        'City Lights Hotel is a contemporary urban retreat located in the heart of Madrid. Offering easy access to the city’s most popular attractions, it is the ideal choice for travelers looking to explore the vibrant culture and history of Spain’s capital. Guests can enjoy complimentary breakfast, comfortable accommodations, and a range of room options tailored to every need. Whether traveling for business or leisure, City Lights Hotel provides an exceptional experience.',
      location: 'Madrid, Spain',
      rating: 4.5,
      price: 100,
      rooms: ['Single', 'Double', 'Suite'],
      availability: [{ start: '2025-01-01', end: '2025-01-06' }],
      people: { adults: 2, children: 0 },
      reviews: 250,
    },
    {
      images: ['/assets/hotels/hotel5.jpg', '/assets/hotels/hotel7.jpg', '/assets/hotels/hotel8.jpg'],
      title: 'Georgian Comfort Inn',
      overview:
        'Immerse yourself in traditional Georgian hospitality at Georgian Comfort Inn. Nestled in the heart of Tbilisi, this charming hotel blends modern amenities with cultural charm. Guests can explore nearby historical landmarks while enjoying spacious rooms, deluxe furnishings, and exceptional service. The property also features a range of dining options, showcasing local and international flavors. Whether you’re visiting for a weekend getaway or a longer stay, Georgian Comfort Inn ensures a welcoming and memorable experience.',
      location: 'Tbilisi, Georgia',
      rating: 4.9,
      price: 90,
      sale: 5,
      newPrice: 85.5,
      rooms: ['Standard', 'Deluxe'],
      availability: [{ start: '2024-12-10', end: '2025-01-01' }],
      people: { adults: 4, children: 2 },
      reviews: 500,
    },
    {
      images: ['/assets/hotels/hotel6.jpg', '/assets/hotels/hotel4.png', '/assets/hotels/hotel5.jpg'],
      title: 'The Royal Stay',
      overview:
        'The Royal Stay lives up to its name, offering a regal experience for all its guests. Situated in the heart of London, this luxurious property boasts top-notch amenities and elegant decor. Guests can indulge in world-class dining, spa treatments, and personalized services. Each room is a sanctuary of comfort and sophistication, ensuring an unforgettable stay. Perfect for those seeking luxury and convenience, The Royal Stay is a true gem in the bustling city of London.',
      location: 'London, United Kingdom',
      rating: 5.0,
      price: 200,
      rooms: ['Royal Suite', 'Deluxe', 'Standard'],
      availability: [{ start: '2024-12-15', end: '2024-12-20' }],
      people: { adults: 3, children: 1 },
      reviews: 800,
    },
    {
      images: ['/assets/hotels/hotel8.jpg', '/assets/hotels/hotel7.jpg', '/assets/hotels/hotel6.jpg'],
      title: 'Historic Haven',
      overview:
        'Historic Haven is a delightful blend of old-world charm and modern comfort. Located in the heart of Rome, this boutique hotel is a haven for history enthusiasts and culture seekers. Each room is uniquely designed to reflect the rich heritage of the city, complemented by contemporary amenities. Guests can explore nearby historical landmarks, enjoy authentic Italian cuisine, and relax in a serene ambiance. Experience the magic of Rome at Historic Haven.',
      location: 'Rome, Italy',
      rating: 4.7,
      price: 130,
      rooms: ['Classic', 'Suite', 'Deluxe'],
      availability: [{ start: '2024-12-05', end: '2024-12-10' }],
      people: { adults: 2, children: 0 },
      reviews: 400,
    },
  ];

  getHotels(
    destination: string,
    checkIn: string,
    checkOut: string,
    adults: number,
    children: number
  ): Observable<Hotel[]> {
    return of(
      this.hotels.filter(
        (hotel) =>
          hotel.location.toLowerCase().includes(destination.toLowerCase()) &&
          hotel.people.adults >= adults &&
          hotel.people.children >= children
      )
    );
  }

  getAllHotels(): Observable<Hotel[]> {
    return of(this.hotels);
  }
  
}
