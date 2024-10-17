import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SurveyService } from '../../services/survey.service';

@Component({
  selector: 'app-survey-setup',
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Survey Setup</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form [formGroup]="setupForm" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="fill" class="full-width">
            <mat-label>Survey Title</mat-label>
            <input matInput formControlName="title" required>
          </mat-form-field>
          
          <mat-form-field appearance="fill" class="full-width">
            <mat-label>Industry or Topic</mat-label>
            <mat-select formControlName="industry" required (selectionChange)="onIndustryChange()">
              <mat-option value="healthcare">Healthcare</mat-option>
              <mat-option value="legal">Legal</mat-option>
              <mat-option value="education">Education</mat-option>
              <mat-option value="finance">Finance</mat-option>
              <mat-option value="technology">Technology</mat-option>
            </mat-select>
          </mat-form-field>
          
          <mat-form-field appearance="fill" class="full-width">
            <mat-label>Target Jurisdictions</mat-label>
            <mat-select formControlName="jurisdictions" multiple required>
              <mat-option value="US">United States</mat-option>
              <mat-option value="EU">European Union</mat-option>
              <mat-option value="CA">Canada</mat-option>
            </mat-select>
          </mat-form-field>
          
          <div class="warnings">
            <mat-card class="warning-card">
              <mat-card-content>
                <mat-icon color="primary">info</mat-icon>
                <span>Selected jurisdictions will affect compliance requirements.</span>
              </mat-card-content>
            </mat-card>
            
            <mat-card *ngFor="let warning of industryWarnings" class="warning-card">
              <mat-card-content>
                <mat-icon color="warn">warning</mat-icon>
                <span>{{ warning }}</span>
              </mat-card-content>
            </mat-card>
          </div>
          
          <button mat-raised-button color="primary" type="submit" [disabled]="!setupForm.valid">Next</button>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .full-width {
      width: 100%;
      margin-bottom: 15px;
    }
    .warnings {
      margin-bottom: 15px;
    }
    .warning-card {
      margin-bottom: 10px;
      background-color: #fff3e0;
    }
    .warning-card mat-icon {
      vertical-align: middle;
      margin-right: 8px;
    }
  `]
})
export class SurveySetupComponent implements OnInit {
  setupForm: FormGroup;
  industryWarnings: string[] = [];

  constructor(
    private fb: FormBuilder,
    private surveyService: SurveyService,
    private router: Router
  ) {
    this.setupForm = this.fb.group({
      title: ['', Validators.required],
      industry: ['', Validators.required],
      jurisdictions: [[], Validators.required]
    });
  }

  ngOnInit() {
    // Initialization logic here
  }

  onSubmit() {
    if (this.setupForm.valid) {
      this.surveyService.updateSurveyData(this.setupForm.value);
      this.surveyService.showComplianceMessage('Survey setup completed. Compliance requirements updated based on industry and jurisdictions.');
      this.router.navigate(['/data-acquisition']);
    }
  }

  onIndustryChange() {
    const selectedIndustry = this.setupForm.get('industry')?.value;
    this.industryWarnings = this.getIndustryWarnings(selectedIndustry);
  }

  private getIndustryWarnings(industry: string): string[] {
    switch (industry) {
      case 'healthcare':
        return ['HIPAA compliance is required for healthcare surveys.'];
      case 'legal':
        return ['Consider USSC guidelines when designing legal surveys.'];
      case 'education':
        return [
          'FERPA compliance is crucial for educational surveys.',
          'PPRA may apply when collecting information from students.',
          'COPPA compliance is required for surveys involving children under 13.'
        ];
      case 'finance':
        return ['GLBA compliance is necessary for financial surveys.'];
      default:
        return [];
    }
  }
}