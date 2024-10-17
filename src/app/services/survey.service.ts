import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private surveyDataSubject = new BehaviorSubject<any>({});
  surveyData$ = this.surveyDataSubject.asObservable();

  constructor(private snackBar: MatSnackBar) {}

  updateSurveyData(data: any) {
    this.surveyDataSubject.next({ ...this.surveyDataSubject.value, ...data });
  }

  showComplianceMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
    });
  }
}