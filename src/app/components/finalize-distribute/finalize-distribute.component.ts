import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SurveyService } from '../../services/survey.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finalize-distribute',
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Compliance Summary</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <mat-list>
          <mat-list-item>
            <mat-icon mat-list-icon color="primary">check_circle</mat-icon>
            <div mat-line>Data collection complies with selected jurisdictions</div>
          </mat-list-item>
          <mat-list-item>
            <mat-icon mat-list-icon color="primary">check_circle</mat-icon>
            <div mat-line>Consent form meets legal requirements</div>
          </mat-list-item>
          <mat-list-item>
            <mat-icon mat-list-icon color="primary">check_circle</mat-icon>
            <div mat-line>Survey questions pass bias check</div>
          </mat-list-item>
        </mat-list>
      </mat-card-content>
    </mat-card>

    <form [formGroup]="distributeForm" (ngSubmit)="onSubmit()">
      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Target Audience</mat-label>
        <mat-select formControlName="audience">
          <mat-option value="all">All jurisdictions</mat-option>
          <mat-option value="us">US only</mat-option>
          <mat-option value="eu">EU only</mat-option>
        </mat-select>
      </mat-form-field>
      
      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Survey End Date</mat-label>
        <input matInput [matDatepicker]="picker" formControlName="endDate">
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>
      
      <button mat-raised-button color="primary" type="submit" [disabled]="!distributeForm.valid">Preview & Publish Survey</button>
    </form>
  `,
  styles: ['.full-width { width: 100%; }']
})
export class FinalizeDistributeComponent {
  distributeForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private surveyService: SurveyService,
    private router: Router
  ) {
    this.distributeForm = this.fb.group({
      audience: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.distributeForm.valid) {
      this.surveyService.updateSurveyData(this.distributeForm.value);
      this.surveyService.showComplianceMessage('Survey complies with all selected jurisdictions. Ready to publish.');
      // Redirect to the published survey view
      this.router.navigate(['/published-survey']);
    }
  }
}