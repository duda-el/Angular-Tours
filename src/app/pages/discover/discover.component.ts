import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../../services/hotel.service';
import { Hotel } from '../../models/hotel.model';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { SearchComponent } from '../../components/search/search.component';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  imports: [CommonModule, HeaderComponent, SearchComponent],
  standalone: true,
  styleUrls: ['./discover.component.css'],
})
export class DiscoverComponent implements OnInit {
  hotels: Hotel[] = [];
  destination: string = '';
  checkIn: string = '';
  checkOut: string = '';
  adults: number = 0;
  children: number = 0;

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.destination = params['destination'] || ''; // Default to empty string if not provided
      this.checkIn = params['checkIn'] || '';
      this.checkOut = params['checkOut'] || '';
      this.adults = +params['adults'] || 0;
      this.children = +params['children'] || 0;

      // Determine whether to fetch filtered or all hotels
      if (
        this.destination ||
        this.checkIn ||
        this.checkOut ||
        this.adults ||
        this.children
      ) {
        this.fetchFilteredHotels();
      } else {
        this.fetchAllHotels();
      }
    });
  }

  createStarArray(rating: number): number[] {
    const maxStars = 5;
    const validRating = Math.min(Math.max(rating || 0, 0), maxStars); // Ensure rating is between 0 and 5
    return Array.from({ length: validRating }, (_, i) => i + 1);
  }

  fetchAllHotels(): void {
    this.hotelService.getAllHotels().subscribe((data) => {
      this.hotels = data;
    });
  }

  fetchFilteredHotels(): void {
    this.hotelService
      .getHotels(
        this.destination,
        this.checkIn,
        this.checkOut,
        this.adults,
        this.children
      )
      .subscribe((data) => {
        this.hotels = data;
      });
  }

  onSortChange(event: Event): void {
    const sortValue = (event.target as HTMLSelectElement).value;
    this.sortHotels(sortValue);
  }

  sortHotels(sortValue: string): void {
    switch (sortValue) {
      case 'recommended':
        // Default sorting logic, if applicable
        this.fetchAllHotels(); // Assuming this resets the sorting to default
        break;
      case 'priceLowToHigh':
        this.hotels.sort(
          (a, b) =>
            (a.price ?? a.newPrice ?? Infinity) - (b.price ?? b.newPrice ?? Infinity)
        );
        break;
      case 'priceHighToLow':
        this.hotels.sort(
          (a, b) =>
            (b.price ?? b.newPrice ?? -Infinity) - (a.price ?? a.newPrice ?? -Infinity)
        );
        break;
      case 'rating':
        this.hotels.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      default:
        break;
    }
  }
  
}
