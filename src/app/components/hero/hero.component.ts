import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import Pikaday from 'pikaday';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add FormsModule here
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements AfterViewInit {
  adults: number = 2; // Default number of adults
  children: number = 0; // Default number of children
  dropdownOpen: boolean = false; // Controls the dropdown visibility

  // Destination suggestion feature
  destinationInput: string = '';
  destinations = [
    { name: 'Prague', details: 'Czech Republic' },
    { name: 'Paris', details: 'Ile de France, France' },
    { name: 'Paris City Centre', details: 'Paris, Ile de France, France' },
    { name: 'Porto', details: 'Norte Region, Portugal' },
    { name: 'San Palace Hotel & Spa', details: 'Hanoi, Ha Noi Municipality, Vietnam' },
  ];
  filteredDestinations: { name: string; details: string }[] = [];
  showSuggestions: boolean = false;

  ngAfterViewInit(): void {
    const checkinPicker = new Pikaday({
      field: document.getElementById('checkin') as HTMLInputElement,
      format: 'YYYY-MM-DD',
      onSelect: (date) => {
        console.log('Check-in date selected:', date);
      },
    });

    const checkoutPicker = new Pikaday({
      field: document.getElementById('checkout') as HTMLInputElement,
      format: 'YYYY-MM-DD',
      onSelect: (date) => {
        console.log('Check-out date selected:', date);
      },
    });

    document.querySelector('#checkin-icon')?.addEventListener('click', () => {
      checkinPicker.show();
    });

    document.querySelector('#checkout-icon')?.addEventListener('click', () => {
      checkoutPicker.show();
    });
  }

  get guestSummary(): string {
    return `${this.adults} adult${this.adults > 1 ? 's' : ''} · ${this.children} child${this.children !== 1 ? 'ren' : ''}`;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  increment(type: string) {
    if (type === 'adults') {
      this.adults++;
    } else if (type === 'children') {
      this.children++;
    }
  }

  decrement(type: string) {
    if (type === 'adults' && this.adults > 1) {
      this.adults--;
    } else if (type === 'children' && this.children > 0) {
      this.children--;
    }
  }

  // Destination suggestion logic
  filterSuggestions(): void {
    const query = this.destinationInput.toLowerCase();
    this.filteredDestinations = this.destinations.filter((destination) =>
      destination.name.toLowerCase().includes(query)
    );
    this.showSuggestions = this.filteredDestinations.length > 0;
  }

  selectDestination(destination: { name: string; details: string }): void {
    this.destinationInput = destination.name;
    this.showSuggestions = false;
  }

  onBlur(): void {
    // Delay hiding suggestions to allow click event on suggestion
    setTimeout(() => {
      this.showSuggestions = false;
    }, 100);
  }

  // Listen for clicks on the document
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;

    // Check if the click occurred outside the dropdown and toggle button
    const dropdown = document.querySelector('.guest-dropdown-menu');
    const dropdownToggle = document.querySelector('.guest-dropdown-summary');

    if (
      this.dropdownOpen &&
      dropdown &&
      dropdownToggle &&
      !dropdown.contains(target) &&
      !dropdownToggle.contains(target)
    ) {
      this.dropdownOpen = false;
    }
  }
}
