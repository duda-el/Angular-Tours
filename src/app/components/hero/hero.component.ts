import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, HostListener } from '@angular/core';
import Pikaday from 'pikaday';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements AfterViewInit {
  adults: number = 2; // Default number of adults
  children: number = 0; // Default number of children
  dropdownOpen: boolean = false; // Controls the dropdown visibility

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
