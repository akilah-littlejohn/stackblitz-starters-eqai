import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="grid-container">
      <h1 class="mat-h1">Hello User</h1>
      <nav>
        <button mat-raised-button color="primary" (click)="startNewSurvey()">Create New Survey</button>
        <button mat-button>My Surveys</button>
        <button mat-button>Settings</button>
      </nav>
      <mat-grid-list cols="2" rowHeight="350px">
        <mat-grid-tile *ngFor="let card of cards" [colspan]="card.cols" [rowspan]="card.rows">
          <mat-card class="dashboard-card">
            <mat-card-header>
              <mat-card-title>
                {{card.title}}
                <button mat-icon-button class="more-button" [matMenuTriggerFor]="menu" aria-label="Toggle menu">
                  <mat-icon>more_vert</mat-icon>
                </button>
                <mat-menu #menu="matMenu" xPosition="before">
                  <button mat-menu-item>Expand</button>
                  <button mat-menu-item>Remove</button>
                </mat-menu>
              </mat-card-title>
            </mat-card-header>
            <mat-card-content class="dashboard-card-content">
              <div>{{card.content}}</div>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>
      </mat-grid-list>
    </div>
  `,
  styles: [`
    .grid-container {
      margin: 20px;
    }
    .dashboard-card {
      position: absolute;
      top: 15px;
      left: 15px;
      right: 15px;
      bottom: 15px;
    }
    .more-button {
      position: absolute;
      top: 5px;
      right: 10px;
    }
    .dashboard-card-content {
      text-align: center;
    }
    nav {
      margin-bottom: 20px;
    }
    nav button {
      margin-right: 10px;
    }
  `]
})
export class DashboardComponent {
  cards = [
    { title: 'Recent Surveys', cols: 2, rows: 1, content: 'No recent surveys' },
    { title: 'Survey Templates', cols: 1, rows: 1, content: 'Browse templates' },
    { title: 'Analytics', cols: 1, rows: 2, content: 'View survey analytics' },
    { title: 'Team Collaboration', cols: 1, rows: 1, content: 'Manage team' }
  ];

  constructor(private router: Router) {}

  startNewSurvey() {
    this.router.navigate(['/survey-setup']);
  }
}