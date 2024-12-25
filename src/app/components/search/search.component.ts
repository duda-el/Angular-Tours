import { Component, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Pikaday from 'pikaday';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements AfterViewInit {
  @Output() searchEvent = new EventEmitter<any>();

  adults: number = 2;
  children: number = 0;
  dropdownOpen: boolean = false;
  destinationInput: string = '';
  destinations = [
    { name: 'Prague', details: 'Czech Republic' },
    { name: 'Paris', details: 'France' },
    { name: 'Porto', details: 'Portugal' },
    { name: 'Barcelona', details: 'Spain' },
    { name: 'Madrid', details: 'Spain' },
    { name: 'Tbilisi', details: 'Georgia' },
    { name: 'London', details: 'United Kingdom' },
    { name: 'Rome', details: 'Italy' },
    { name: 'Berlin', details: 'Germany' },
    { name: 'Vienna', details: 'Austria' },
    { name: 'Amsterdam', details: 'Netherlands' },
    { name: 'Istanbul', details: 'Turkey' },
    { name: 'Budapest', details: 'Hungary' },
    { name: 'Athens', details: 'Greece' },
    { name: 'Lisbon', details: 'Portugal' },
    { name: 'New York', details: 'United States' },
    { name: 'Tokyo', details: 'Japan' },
    { name: 'Bangkok', details: 'Thailand' },
    { name: 'Dubai', details: 'United Arab Emirates' },
    { name: 'Moscow', details: 'Russia' },
    { name: 'Kuala Lumpur', details: 'Malaysia' },
    { name: 'Singapore', details: 'Singapore' },
    { name: 'Sydney', details: 'Australia' },
    { name: 'Seoul', details: 'South Korea' },
    { name: 'Cape Town', details: 'South Africa' },
  ];

  filteredDestinations: { name: string; details: string }[] = [];
  showSuggestions: boolean = false;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    new Pikaday({
      field: document.getElementById('checkin') as HTMLInputElement,
    });
    new Pikaday({
      field: document.getElementById('checkout') as HTMLInputElement,
    });
  }

  get guestSummary(): string {
    return `${this.adults} adult${this.adults > 1 ? 's' : ''} · ${
      this.children
    } child${this.children !== 1 ? 'ren' : ''}`;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  increment(type: string) {
    if (type === 'adults') this.adults++;
    else if (type === 'children') this.children++;
  }

  decrement(type: string) {
    if (type === 'adults' && this.adults > 1) this.adults--;
    else if (type === 'children' && this.children > 0) this.children--;
  }

  filterSuggestions(): void {
    const query = this.destinationInput.toLowerCase();
    this.filteredDestinations = this.destinations.filter((d) =>
      d.name.toLowerCase().includes(query)
    );
    this.showSuggestions = this.filteredDestinations.length > 0;
  }

  selectDestination(destination: { name: string; details: string }): void {
    this.destinationInput = destination.name;
    this.showSuggestions = false;
  }

  onBlur(): void {
    setTimeout(() => {
      this.showSuggestions = false;
    }, 100);
  }

  searchHotels() {
    if (!this.destinationInput) {
      alert('Please enter a destination.');
      return;
    }

    const queryParams = {
      destination: this.destinationInput,
      checkIn:
        (document.getElementById('checkin') as HTMLInputElement)?.value || '',
      checkOut:
        (document.getElementById('checkout') as HTMLInputElement)?.value || '',
      adults: this.adults.toString(),
      children: this.children.toString(),
    };

    this.router.navigate(['/discover'], { queryParams });
    this.searchEvent.emit(queryParams);
  }
}
