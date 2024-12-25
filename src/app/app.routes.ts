import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { DiscoverComponent } from './pages/discover/discover.component';
import { HotelPageComponent } from './pages/hotel-page/hotel-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signin', component: LoginComponent },
  { path: 'discover', component: DiscoverComponent },
  { path: 'hotel/:title', component: HotelPageComponent },
];
