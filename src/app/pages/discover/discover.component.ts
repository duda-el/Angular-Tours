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

  constructor(private route: ActivatedRoute, private hotelService: HotelService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.destination = params['destination'];
      this.checkIn = params['checkIn'];
      this.checkOut = params['checkOut'];
      this.adults = +params['adults'];
      this.children = +params['children'];

      this.fetchHotels();
    });
  }

  createStarArray(rating: number): number[] {
    const maxStars = 5;
    const validRating = Math.min(Math.max(rating || 0, 0), maxStars); // Ensure rating is between 0 and 5
    return Array.from({ length: validRating }, (_, i) => i + 1);
  }
  

  fetchHotels(): void {
    this.hotelService
      .getHotels(this.destination, this.checkIn, this.checkOut, this.adults, this.children)
      .subscribe((data) => {
        this.hotels = data;
      });
  }
}
