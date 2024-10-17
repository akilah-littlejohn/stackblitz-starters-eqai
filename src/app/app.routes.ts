import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SurveySetupComponent } from './components/survey-setup/survey-setup.component';
import { DataAcquisitionComponent } from './components/data-acquisition/data-acquisition.component';
import { SurveyDesignComponent } from './components/survey-design/survey-design.component';
import { FinalizeDistributeComponent } from './components/finalize-distribute/finalize-distribute.component';
import { PublishedSurveyComponent } from './components/published-survey/published-survey.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'survey-setup', component: SurveySetupComponent, canActivate: [AuthGuard] },
  { path: 'data-acquisition', component: DataAcquisitionComponent, canActivate: [AuthGuard] },
  { path: 'survey-design', component: SurveyDesignComponent, canActivate: [AuthGuard] },
  { path: 'finalize-distribute', component: FinalizeDistributeComponent, canActivate: [AuthGuard] },
  { path: 'published-survey', component: PublishedSurveyComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];