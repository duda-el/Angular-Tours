import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../../services/hotel.service';
import { Hotel } from '../../models/hotel.model';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  reservedHotel: Hotel | null = null;
  readonly tax: number = 8.32;
  couponCode: string = '';
  discount: number = 0;
  readonly validCoupon: string = 'DISCOUNT20';

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService
  ) {}

  ngOnInit(): void {
    const title = this.route.snapshot.queryParamMap.get('title');

    if (title) {
      this.hotelService.getAllHotels().subscribe((hotels) => {
        const hotel = hotels.find(
          (hotel) => this.slugify(hotel.title) === this.slugify(title)
        );
        this.reservedHotel = hotel || null;
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

  createStarArray(rating: number): number[] {
    const maxStars = 5;
    const validRating = Math.min(Math.max(rating || 0, 0), maxStars);
    return Array.from({ length: validRating }, (_, i) => i + 1);
  }

  getNightCount(): number {
    if (this.reservedHotel?.availability?.length) {
      const startDate = new Date(this.reservedHotel.availability[0].start);
      const endDate = new Date(this.reservedHotel.availability[0].end);

      const diffInTime = endDate.getTime() - startDate.getTime();
      return Math.ceil(diffInTime / (1000 * 3600 * 24));
    }
    return 0;
  }

  getTotalPrice(): number {
    const nightCount = this.getNightCount();
    const nightlyPrice =
      this.reservedHotel?.newPrice || this.reservedHotel?.price || 0;
    const totalPrice = nightCount * nightlyPrice + this.tax;

    return totalPrice - this.discount;
  }

  applyCoupon(): void {
    if (this.couponCode === this.validCoupon) {
      this.discount = this.getTotalPrice() * 0.2;

      Swal.fire({
        title: 'Success!',
        text: 'Coupon applied successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } else {
      this.discount = 0;

 
      Swal.fire({
        title: 'Error!',
        text: 'Invalid coupon code.',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  }

  formatPrice(price: number): string {
    return price.toFixed(2);
  }
}
