import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  // Route for the Home page
  { path: '', component: HomeComponent },
  { path: 'signin', component: LoginComponent },
];
