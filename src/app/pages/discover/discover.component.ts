import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../../services/hotel.service';
import { Hotel } from '../../models/hotel.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  imports: [CommonModule],
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

  fetchHotels(): void {
    this.hotelService
      .getHotels(this.destination, this.checkIn, this.checkOut, this.adults, this.children)
      .subscribe((data) => {
        this.hotels = data;
      });
  }
}
