import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="vh-100 d-flex align-items-center justify-content-center" style="background-color: #f8f9fa;">
  <div class="text-center p-5 shadow-lg rounded" style="background-color: white; max-width: 500px;">
    
    <!-- Happy Hello Emoji Image -->
    <img src="https://cdn-icons-png.flaticon.com/512/742/742751.png" 
         alt="Happy Hello Face" 
         class="mb-4" 
         style="width: 100px;" />

    <!-- Heading -->
    <h1 class="mb-4 fw-bold">Say Helloo!</h1>

    <!-- Button -->
    <button routerLink="/app-login" class="btn btn-primary btn-lg">
      Go to Login
    </button>

  </div>
</section>

  `,
  styles: [
    `
      h1 {
        font-size: 2rem;
        margin-bottom: 1rem;
      }
      button {
        padding: 0.5rem 1rem;
      }
    `,
  ],
})
export class HomeComponent {}
