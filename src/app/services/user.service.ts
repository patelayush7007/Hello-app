import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: any = null;
  private apiUrl = 'http://localhost:5000/api';
  constructor(private http: HttpClient) {}

  // API endpoint for registration
  private readonly registerUrl = 'http://localhost:5000/api/auth/register';

  // Registers a new user
  registerUser(userData: any): Observable<any> {
    return this.http.post('http://localhost:5000/api/users/register', userData);
  }

  // Sets user data and stores in localStorage
  setUser(userData: any) {
    this.user = userData;
    try {
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (err) {
      console.error('Error saving user to localStorage', err);
    }
  }

  // Gets user data from memory or localStorage
  getUser() {
    if (!this.user) {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        try {
          this.user = JSON.parse(savedUser);
        } catch (err) {
          console.error('Error parsing user from localStorage', err);
          this.user = null;
        }
      }
    }
    return this.user;
  }

  // Clears user data from memory and localStorage
  clearUser() {
    this.user = null;
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
  }
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${userId}`);
  }
}
