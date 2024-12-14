import { Component } from '@angular/core';
import { DestinationService } from '../../services/destination.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dreamvacation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dreamvacation.component.html',
  styleUrl: './dreamvacation.component.css',
})
export class DreamvacationComponent {
  destinations: Array<{ name: string; properties: number; image: string }> = [];
  inspirations: Array<{ title: string; description: string; image: string }> = [];
  hotels: Array<{ name: string; properties: number; image: string }> = [];

  constructor(private destinationService: DestinationService) {}

  ngOnInit() {
    this.destinations = this.destinationService.getDestinations();
    this.inspirations = this.destinationService.getInspiration();
    this.hotels = this.destinationService.getHotels();
  }
}
