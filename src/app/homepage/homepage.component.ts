import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  imports: [
    CommonModule,  // <-- Import CommonModule here
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {
  user: any;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {

    this.user = this.userService.getUser();
    if (!this.user) {
      this.router.navigate(['/login']);  // Redirect if not logged in
    }
  }

  logout() {
    // Clear user data from the service
    this.userService.clearUser();

    // Redirect to the login page
    this.router.navigate(['']);
    // window.location.href = '/login';  // Ensure the redirect happens correctly
  }
}