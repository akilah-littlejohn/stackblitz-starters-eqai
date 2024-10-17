import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <app-header [isLoggedIn]="authService.isAuthenticated()" (logout)="logout()"></app-header>
    <div class="content-container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .content-container {
      padding: 20px;
    }
  `]
})
export class AppComponent {
  constructor(public authService: AuthService, private router: Router) {}

  async logout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle logout error
    }
  }
}