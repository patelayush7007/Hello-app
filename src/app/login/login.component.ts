import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';  // Import UserService

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

  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UserService  // Inject UserService
  ) {}

  // loginUser() {
  //   this.http.post('http://localhost:5000/api/auth/login', {
  //     email: this.loginData.email,
  //     password: this.loginData.password,
  //   }).subscribe({
  //     next: (res: any) => {
  //       console.log('Login Success', res);

  //       // Save user data in the UserService after login
  //       this.userService.setUser(res.user);  // Assume 'res.user' has the user data

  //       // Navigate to the home page
  //       this.router.navigate(['/home']);
  //     },
  //     error: (err) => {
  //       console.error('Login Error', err);
  //       alert(err.error.message || 'Login failed!');
  //     }
  //   });
  // }
//   loginUser() {
//   this.http.post('http://localhost:5000/api/auth/login', {
//     email: this.loginData.email,
//     password: this.loginData.password,
//   }).subscribe({
//     next: (res: any) => {
//       console.log('Login Success', res);
//       // Save the user data and token in the UserService
//       this.userService.setUser(res.data.user); // Save user data
//       localStorage.setItem('accessToken', res.data.accessToken); // Save the token (optional)

//       this.router.navigate(['/home']);
//     },
//     error: (err) => {
//       console.error('Login Error', err);
//       alert(err.error.message || 'Login failed!');
//     }
//   });
// }
loginUser() {
  this.http.post('http://localhost:5000/api/auth/login', {
    email: this.loginData.email,
    password: this.loginData.password,
  }).subscribe({
    next: (res: any) => {
      console.log('Login Success', res);

      // Save the user data and token in the UserService
      this.userService.setUser(res.data.user);  // Save user data (res.data.user)
      localStorage.setItem('accessToken', res.data.accessToken); // Save the token (optional)

      // Redirect to the home page
      this.router.navigate(['/home']);
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
