import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  errorMessage: string | null = null;

  constructor(private userService: UserService, private router: Router) {}

  public onSubmit(form: NgForm) {
    const { email, password } = form.value;
    const user = this.userService.signIn(email, password);
    if (user) {
      this.router.navigate(['/']);
    } else {
      this.errorMessage = 'Invalid email or password.';
    }
  }
}
