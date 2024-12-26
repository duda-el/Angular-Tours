import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users = [
    {
      id: 1,
      email: 'user1@example.com',
      password: 'password1',
      profileImage: 'assets/profile.png',
    },
  ];

  constructor() {
    const storedUser = sessionStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    }
  }

  private currentUser: any = null;

  signIn(email: string, password: string) {
    const user = this.users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      this.currentUser = user;
      sessionStorage.setItem('currentUser', JSON.stringify(user));
    }
    return user;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  logout() {
    this.currentUser = null;
    sessionStorage.removeItem('currentUser');
  }
}
