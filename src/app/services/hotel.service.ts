import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hotel } from '../models/hotel.model';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  private hotels: Hotel[] = [
    {
      title: 'Luxury Suites',
      overview: 'A luxurious stay in the city.',
      location: 'Prague, Czech Republic',
      rating: 4.8,
      price: 120,
      sale: 10,
      newPrice: 108,
      rooms: ['Deluxe', 'Suite', 'Standard'],
      availability: [{ start: '2024-12-20', end: '2025-01-10' }],
      people: { adults: 3, children: 1 },
    },
    {
      title: 'Budget Inn',
      overview: 'Affordable rooms with great amenities.',
      location: 'Paris, France',
      rating: 4.2,
      price: 60,
      rooms: ['Single', 'Double'],
      availability: [{ start: '2024-12-01', end: '2024-12-31' }],
      people: { adults: 2, children: 0 },
    },
  ];

  getHotels(destination: string, checkIn: string, checkOut: string, adults: number, children: number): Observable<Hotel[]> {
    return of(
      this.hotels.filter((hotel) =>
        hotel.location.toLowerCase().includes(destination.toLowerCase()) &&
        hotel.people.adults >= adults &&
        hotel.people.children >= children
      )
    );
  }
}
