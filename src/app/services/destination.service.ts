import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DestinationService {
  getDestinations() {
    return [
      {
        name: 'Australia',
        properties: 2246,
        image: 'assets/img1.jpeg',
      },
      {
        name: 'Japan',
        properties: 1278,
        image: 'assets/img2.jpeg',
      },
      {
        name: 'New Zealand',
        properties: 480,
        image: 'assets/img3.jpeg',
      },
      {
        name: 'Greece',
        properties: 320,
        image: 'assets/img4.jpeg',
      },
    ];
  }

  getInspiration() {
    return [
      {
        title: "Sydney's 10 most fashionable 5-star hotels",
        description:
          'Browse the fastest growing tourism sector in the heart of Australia tourism capital ....',
        image: 'assets/5.jpeg',
      },
      {
        title: 'Top cities for Vegan Travellers',
        description:
          'Top sites where you do not have to worry about being a vegan. Our tourist guide is here...',
        image: 'assets/6.jpeg',
      },
      {
        title: "World's top destinations during and post covid timeline",
        description:
          "Pandemic is still intact and will be here for a longer time. Here's where your next destination...",
        image: 'assets/7.jpeg',
      },
    ];
  }

  getHotels() {
    return [
      {
        name: 'Lakeside Motel Warefront',
        properties: 2246,
        image: 'assets/8.jpeg',
      },
      {
        name: 'Recce Graham resort',
        properties: 1278,
        image: 'assets/9.jpeg',
      },
      {
        name: 'Fireside Dinners',
        properties: 480,
        image: 'assets/10.jpeg',
      },
      {
        name: 'Oculous Inn Stay',
        properties: 320,
        image: 'assets/11.jpeg',
      },
    ];
  }
}
