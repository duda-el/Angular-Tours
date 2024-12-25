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
  filteredHotels: Hotel[] = [];
  selectedPriceRanges: { min: number; max: number }[] = [];
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
      this.filteredHotels = data; // Initialize filteredHotels
      console.log('All hotels:', this.filteredHotels);
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
        this.filteredHotels = data; // Initialize filteredHotels to match the filtered results
      });
  }

  onSortChange(event: Event): void {
    const sortValue = (event.target as HTMLSelectElement).value;
    this.sortHotels(sortValue);
  }

  sortHotels(sortValue: string): void {
    switch (sortValue) {
      case 'recommended':
        this.fetchAllHotels(); // Reset sorting to default
        break;
      case 'priceLowToHigh':
        this.filteredHotels.sort(
          (a, b) =>
            (a.price ?? a.newPrice ?? Infinity) -
            (b.price ?? b.newPrice ?? Infinity)
        );
        break;
      case 'priceHighToLow':
        this.filteredHotels.sort(
          (a, b) =>
            (b.price ?? b.newPrice ?? -Infinity) -
            (a.price ?? a.newPrice ?? -Infinity)
        );
        break;
      case 'rating':
        this.filteredHotels.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      default:
        break;
    }
  }

  onPriceFilterChange(event: Event, min: number, max: number): void {
    const checkbox = event.target as HTMLInputElement;
    console.log('Price filter changed:', { checked: checkbox.checked, min, max });
  
    if (checkbox.checked) {
      // Add the selected price range
      this.selectedPriceRanges.push({ min, max });
    } else {
      // Remove the deselected price range
      this.selectedPriceRanges = this.selectedPriceRanges.filter(
        (range) => range.min !== min || range.max !== max
      );
    }
  
    this.filterHotels(); // Trigger filtering
  }
  

  filterHotels(): void {
    if (this.selectedPriceRanges.length === 0) {
      // If no filters are selected, show all hotels
      this.filteredHotels = this.hotels;
      console.log('No filters selected. Showing all hotels:', this.filteredHotels);
      return;
    }
  
    console.log('Selected price ranges:', this.selectedPriceRanges);
  
    // Filter hotels based on selected price ranges
    this.filteredHotels = this.hotels.filter((hotel) => {
      const hotelPrice = hotel.sale ? hotel.newPrice : hotel.price;
      const validPrice = hotelPrice ?? Infinity; // Default to Infinity if undefined
      return this.selectedPriceRanges.some(
        (range) => validPrice >= range.min && validPrice <= range.max
      );
    });
  
    console.log('Filtered hotels:', this.filteredHotels);
  }
  
}
