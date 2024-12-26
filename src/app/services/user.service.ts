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

  private currentUser: any = null;

  constructor() {
    const storedUser = sessionStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    }
  }

  register(email: string, password: string, profileImage: string) {
    const newUser = {
      id: this.users.length + 1,
      email,
      password,
      profileImage,
    };
    this.users.push(newUser);
    this.currentUser = newUser;
    sessionStorage.setItem('currentUser', JSON.stringify(newUser));
  }

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
