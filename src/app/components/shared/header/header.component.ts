import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar color="primary">
      <span>EquiSurvey AI</span>
      <span class="spacer"></span>
      <button *ngIf="isLoggedIn" mat-icon-button [matMenuTriggerFor]="menu" aria-label="User menu">
        <mat-icon>account_circle</mat-icon>
      </button>
      <mat-menu #menu="matMenu">
        <button mat-menu-item (click)="onLogout()">Logout</button>
      </mat-menu>
    </mat-toolbar>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
  `]
})
export class HeaderComponent {
  @Input() isLoggedIn: boolean = false;
  @Output() logout = new EventEmitter<void>();

  onLogout() {
    this.logout.emit();
  }
}