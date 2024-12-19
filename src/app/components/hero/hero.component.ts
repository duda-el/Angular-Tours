import { Component, AfterViewInit } from '@angular/core';
import Pikaday from 'pikaday';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements AfterViewInit {
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
}
