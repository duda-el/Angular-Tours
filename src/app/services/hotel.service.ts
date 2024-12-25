import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hotel } from '../models/hotel.model';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  private hotels: Hotel[] = [
    {
      image: '/assets/hotels/hotel1.png',
      title: 'Luxury Suites',
      overview:
        'Reats include a glass of Czech champagne, parking and a late checkout. Gym included. Flexible cancellation applies.',
      location: 'Prague, Czech Republic',
      rating: 4.8,
      price: 120,
      sale: 10,
      newPrice: 108,
      rooms: ['Deluxe', 'Suite', 'Standard'],
      availability: [{ start: '2024-12-20', end: '2025-01-10' }],
      people: { adults: 3, children: 1 },
      reviews: 1200,
    },
    {
      image: '/assets/hotels/hotel2.png',
      title: 'Budget Inn',
      overview:
        'Reats include a glass of French champagne, parking and a late checkout. Gym included. Flexible cancellation applies.',
      location: 'Paris, France',
      rating: 4.2,
      price: 60,
      rooms: ['Single', 'Double'],
      availability: [{ start: '2024-12-01', end: '2024-12-31' }],
      people: { adults: 2, children: 0 },
      reviews: 100,
    },
    {
      image: '/assets/hotels/hotel3.png',
      title: 'Mediterranean Escape',
      overview:
        'A beachfront hotel offering exquisite Mediterranean cuisine and stunning sea views.',
      location: 'Barcelona, Spain',
      rating: 4.6,
      price: 150,
      rooms: ['Sea View', 'Suite', 'Standard'],
      availability: [{ start: '2024-11-15', end: '2024-12-31' }],
      people: { adults: 2, children: 1 },
      reviews: 300,
    },
    {
      image: '/assets/hotels/hotel4.png',
      title: 'City Lights Hotel',
      overview:
        'Located in the heart of the city with easy access to popular attractions. Free breakfast included.',
      location: 'Madrid, Spain',
      rating: 4.5,
      price: 100,
      rooms: ['Single', 'Double', 'Suite'],
      availability: [{ start: '2024-12-01', end: '2025-01-10' }],
      people: { adults: 2, children: 0 },
      reviews: 250,
    },
    {
      image: '/assets/hotels/hotel5.jpg',
      title: 'Georgian Comfort Inn',
      overview:
        'Traditional Georgian hospitality with modern amenities. Close to historical landmarks.',
      location: 'Tbilisi, Georgia',
      rating: 4.9,
      price: 90,
      sale: 5,
      newPrice: 85.5,
      rooms: ['Standard', 'Deluxe'],
      availability: [{ start: '2024-12-10', end: '2025-01-20' }],
      people: { adults: 4, children: 2 },
      reviews: 500,
    },
    {
      image: '/assets/hotels/hotel6.jpg',
      title: 'The Royal Stay',
      overview:
        'A luxurious hotel offering top-notch amenities and royal treatment for all guests.',
      location: 'London, United Kingdom',
      rating: 5.0,
      price: 200,
      rooms: ['Royal Suite', 'Deluxe', 'Standard'],
      availability: [{ start: '2024-12-15', end: '2025-01-15' }],
      people: { adults: 3, children: 1 },
      reviews: 800,
    },
    {
      image: '/assets/hotels/hotel7.png',
      title: 'Historic Haven',
      overview:
        'A charming hotel with a mix of historic and modern decor. Perfect for history enthusiasts.',
      location: 'Rome, Italy',
      rating: 4.7,
      price: 130,
      rooms: ['Classic', 'Suite', 'Deluxe'],
      availability: [{ start: '2024-12-05', end: '2024-12-30' }],
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
