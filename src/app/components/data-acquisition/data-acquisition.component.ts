import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SurveyService } from '../../services/survey.service';

@Component({
  selector: 'app-data-acquisition',
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Data Acquisition</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form [formGroup]="dataForm" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="fill" class="full-width">
            <mat-label>Data Types to Collect</mat-label>
            <mat-select formControlName="dataTypes" multiple required>
              <mat-option value="personalIdentifiers">Personal Identifiers</mat-option>
              <mat-option value="demographicData">Demographic Data</mat-option>
              <mat-option value="caseRelatedInfo">Case-Related Information</mat-option>
            </mat-select>
          </mat-form-field>
          
          <mat-form-field appearance="fill" class="full-width">
            <mat-label>Consent Form Customization</mat-label>
            <textarea matInput formControlName="consentForm" rows="4" placeholder="Customize consent language..."></textarea>
          </mat-form-field>
          
          <button mat-raised-button color="primary" type="submit" [disabled]="!dataForm.valid">Next</button>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .full-width {
      width: 100%;
      margin-bottom: 15px;
    }
  `]
})
export class DataAcquisitionComponent implements OnInit {
  dataForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private surveyService: SurveyService,
    private router: Router
  ) {
    this.dataForm = this.fb.group({
      dataTypes: [[], Validators.required],
      consentForm: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Initialization logic here
  }

  onSubmit() {
    if (this.dataForm.valid) {
      this.surveyService.updateSurveyData(this.dataForm.value);
      this.surveyService.showComplianceMessage('Data acquisition settings updated. Ensure compliance with relevant regulations.');
      this.router.navigate(['/survey-design']);
    }
  }
}