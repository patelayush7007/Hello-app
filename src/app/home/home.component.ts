import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <h1>Welcome to the Home Page</h1>
    <button routerLink="/app-login">Go to Login</button>
  `,
  styles: [`
    h1 { font-size: 2rem; margin-bottom: 1rem; }
    button { padding: 0.5rem 1rem; }
  `]
})
export class HomeComponent {}
