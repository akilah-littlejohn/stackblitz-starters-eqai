import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-published-survey',
  template: `
    <div class="progress-container">
      <mat-progress-bar mode="determinate" [value]="progressPercentage"></mat-progress-bar>
    </div>

    <div class="survey-container">
      <mat-card class="survey-card" *ngIf="!surveyStarted">
        <mat-card-title>Community Access Survey</mat-card-title>
        <mat-card-content>
          <p>We are conducting a survey to understand equitable access to essential resources in your community. Your responses will help us identify areas for improvement.</p>
          <p><strong>Privacy Notice:</strong> Your responses are anonymous and will be used solely for research purposes. Please read our <a href="#">Privacy Policy</a> for more information.</p>
          
          <mat-checkbox [(ngModel)]="consentGiven" required>
            I have read and agree to the terms and conditions.
          </mat-checkbox>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary" (click)="startSurvey()" [disabled]="!consentGiven">Start Survey</button>
        </mat-card-actions>
      </mat-card>

      <form [formGroup]="surveyForm" (ngSubmit)="onSubmit()" *ngIf="surveyStarted && !surveyCompleted">
        <mat-card class="survey-card question-card" *ngIf="currentQuestionIndex < questions.length">
          <mat-card-content>
            <p class="question-text">{{ currentQuestion.text }}</p>
            <mat-radio-group formControlName="currentAnswer">
              <mat-radio-button *ngFor="let option of currentQuestion.options" [value]="option">
                {{ option }}
              </mat-radio-button>
            </mat-radio-group>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button type="button" (click)="previousQuestion()" [disabled]="currentQuestionIndex === 0">Previous</button>
            <button mat-button type="button" (click)="nextQuestion()" *ngIf="currentQuestionIndex < questions.length - 1">Next</button>
            <button mat-raised-button color="primary" type="submit" *ngIf="currentQuestionIndex === questions.length - 1">Submit</button>
          </mat-card-actions>
        </mat-card>
      </form>

      <mat-card class="survey-card" *ngIf="surveyCompleted">
        <mat-card-title>Thank You!</mat-card-title>
        <mat-card-content>
          <p>Your responses have been recorded. We appreciate your time and valuable input.</p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .progress-container {
      width: 100%;
      margin-bottom: 20px;
    }
    .survey-container {
      max-width: 800px;
      margin: 20px auto;
      padding: 20px;
    }
    .survey-card {
      margin-bottom: 20px;
    }
    .question-text {
      font-size: 18px;
      margin-bottom: 16px;
    }
    mat-radio-group {
      display: flex;
      flex-direction: column;
      margin: 15px 0;
    }
    mat-radio-button {
      margin: 5px;
    }
  `]
})
export class PublishedSurveyComponent implements OnInit {
  surveyForm: FormGroup;
  consentGiven = false;
  surveyStarted = false;
  surveyCompleted = false;
  currentQuestionIndex = 0;
  progressPercentage = 0;

  questions = [
    {
      text: 'How satisfied are you with the availability of clean water in your area?',
      options: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied']
    },
    {
      text: 'How would you rate the quality of public transportation in your community?',
      options: ['Excellent', 'Good', 'Average', 'Poor', 'Very Poor']
    },
    {
      text: 'How easy is it to access healthcare services in your area?',
      options: ['Very Easy', 'Easy', 'Moderate', 'Difficult', 'Very Difficult']
    }
  ];

  constructor(private fb: FormBuilder) {
    this.surveyForm = this.fb.group({
      currentAnswer: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.updateProgressBar();
  }

  get currentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  startSurvey() {
    this.surveyStarted = true;
    this.updateProgressBar();
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.updateProgressBar();
    }
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.surveyForm.patchValue({currentAnswer: ''});
      this.updateProgressBar();
    }
  }

  onSubmit() {
    if (this.surveyForm.valid) {
      // Here you would typically send the survey data to a server
      console.log('Survey submitted:', this.surveyForm.value);
      this.surveyCompleted = true;
      this.updateProgressBar();
    }
  }

  updateProgressBar() {
    if (!this.surveyStarted) {
      this.progressPercentage = 0;
    } else if (this.surveyCompleted) {
      this.progressPercentage = 100;
    } else {
      this.progressPercentage = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
    }
  }
}