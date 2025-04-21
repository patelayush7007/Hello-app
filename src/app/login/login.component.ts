import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    email: '',
    password: '',
  };
  errorMessage = '';

  constructor(private router: Router, private http: HttpClient) {}

  loginUser() {
    this.http.post('http://localhost:5000/api/auth/login', {
      email: this.loginData.email,
      password: this.loginData.password,
    }).subscribe({
      next: (res) => {
        console.log('Login Success', res);
        this.router.navigate(['']);
      },
      error: (err) => {
        console.error('Login Error', err);
        alert(err.error.message || 'Login failed!');
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/app-register']);
  }
}
