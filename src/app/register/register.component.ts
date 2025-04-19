import { Component } from '@angular/core';
import { UserService } from '../services/user.service';  // adjust the path if needed
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private userService: UserService) {}  // <-- ✅ this is the important part

  onRegister() {
    if (this.user.name && this.user.email && this.user.password) {
      this.userService.registerUser(this.user).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          alert('User registered successfully!');
          this.user = { name: '', email: '', password: '' };
        },
        error: (error) => {
          console.error('Registration failed:', error);
          alert('Registration failed. Please try again.');
        }
      });
    } else {
      alert('Please fill in all fields.');
    }
  }
}
