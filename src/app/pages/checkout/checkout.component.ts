import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../../services/hotel.service';
import { Hotel } from '../../models/hotel.model';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  reservedHotel: Hotel | null = null;

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService
  ) {}

  ngOnInit(): void {
    const title = this.route.snapshot.queryParamMap.get('title');

    if (title) {
      this.hotelService.getAllHotels().subscribe((hotels) => {
        const hotel = hotels.find(
          (hotel) => this.slugify(hotel.title) === this.slugify(title)
        );
        this.reservedHotel = hotel || null; // Ensure null if no match found
      });
    } else {
      console.error('No hotel title provided in query parameters.');
    }
  }

  slugify(title: string): string {
    return title
      .toLowerCase()
      .replace(/[\s\W-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  createStarArray(rating: number): number[] {
    const maxStars = 5;
    const validRating = Math.min(Math.max(rating || 0, 0), maxStars); // Ensure rating is between 0 and 5
    return Array.from({ length: validRating }, (_, i) => i + 1);
  }
}
