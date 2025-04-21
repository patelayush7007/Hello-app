import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']  
})
export class HomepageComponent implements OnInit {
  user: any = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
     if (this.user?.photos?.[0]?.value?.startsWith('http://')) {
    this.user.photos[0].value = this.user.photos[0].value.replace('http://', 'https://');
  }
    if (!this.user) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    console.log('Logging out...'); 
    this.userService.clearUser(); // clear local user data
    this.user = null;
    
    // clear from localStorage/sessionStorage 
    localStorage.removeItem('user');
    
    this.router.navigate(['']); // redirect to login route
    alert("user logged out successfully")
  }
}
