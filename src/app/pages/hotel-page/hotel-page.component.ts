import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HotelService } from '../../services/hotel.service';
import { Hotel } from '../../models/hotel.model';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-hotel-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, RouterModule],
  templateUrl: './hotel-page.component.html',
  styleUrl: './hotel-page.component.css',
})
export class HotelPageComponent implements OnInit {
  hotel: Hotel | undefined;

  constructor(private route: ActivatedRoute, private hotelService: HotelService) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('title');

    this.hotelService.getAllHotels().subscribe((hotels) => {
      this.hotel = hotels.find((hotel) => this.slugify(hotel.title) === slug);
    });
  }

  slugify(title: string): string {
    return title
      .toLowerCase()
      .replace(/[\s\W-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  createStarArray(rating: number | undefined): number[] {
    if (!rating) {
      return [];
    }
    return Array(Math.round(rating)).fill(0);
  }
  
  
}
