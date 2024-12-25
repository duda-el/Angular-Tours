import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Pikaday from 'pikaday';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  imports: [CommonModule, FormsModule],
})
export class HeroComponent implements AfterViewInit {
  adults: number = 2;
  children: number = 0;
  dropdownOpen: boolean = false;
  destinationInput: string = '';
  destinations = [
    { name: 'Prague', details: 'Czech Republic' },
    { name: 'Paris', details: 'France' },
    { name: 'Porto', details: 'Portugal' },
  ];
  filteredDestinations: { name: string; details: string }[] = [];
  showSuggestions: boolean = false;

  onBlur(): void {
    setTimeout(() => {
      this.showSuggestions = false;
    }, 100);
  }

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
  }
}
