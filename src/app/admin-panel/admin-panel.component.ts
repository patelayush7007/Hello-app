import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
  imports: [
    CommonModule  // Add CommonModule to the imports array
  ]
})
export class AdminPanelComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (res) => this.users = res,
      error: (err) => console.error('Error loading users:', err)
    });
  }
  
  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe({
      next: () => this.loadUsers(),
      error: (err) => console.error('Error deleting user:', err)
    });
  }
}
