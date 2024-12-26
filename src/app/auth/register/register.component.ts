import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  profileImgPreview: string | ArrayBuffer | null = null;
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImgPreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (!this.email.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email is required!',
      });
      return;
    }

    if (!this.password.trim() || !this.confirmPassword.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password and confirm password are required!',
      });
      return;
    }

    if (this.password !== this.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Passwords do not match!',
      });
      return;
    }

    if (!this.profileImgPreview) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please upload a profile image!',
      });
      return;
    }


    this.userService.register(
      this.email.trim(),
      this.password.trim(),
      this.profileImgPreview as string
    );

    Swal.fire({
      icon: 'success',
      title: 'Registration Successful',
      text: 'You have successfully registered!',
      timer: 2000,
      showConfirmButton: false,
    });

    this.router.navigate(['/']); 
  }
}
