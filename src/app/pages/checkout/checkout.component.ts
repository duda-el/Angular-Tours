import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../../services/hotel.service';
import {Hotel} from '../../models/hotel.model'
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  reservedHotel: Hotel | undefined;

  constructor(private route: ActivatedRoute, private hotelService: HotelService) {}

  ngOnInit(): void {
    const title = this.route.snapshot.queryParamMap.get('title');

    if (title) {
      this.hotelService.getAllHotels().subscribe((hotels) => {
        this.reservedHotel = hotels.find(
          (hotel) => this.slugify(hotel.title) === this.slugify(title)
        );
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
}
