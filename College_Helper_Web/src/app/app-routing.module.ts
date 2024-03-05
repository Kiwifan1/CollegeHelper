import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loginGuard } from './guards/login.guard';
import { CollegeSearchPageComponent } from './Components/college-search-page/college-search-page.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { LoginPageComponent } from './Components/login-page/login-page.component';
import { RegisterPageComponent } from './Components/register-page/register-page.component';
import { QuestionnaireStepperComponent } from './Components/questionnaire-stepper/questionnaire-stepper.component';
import { notLoggedInGuard } from './guards/not-logged-in.guard';
import { questionnaireGuard } from './guards/questionnaire.guard';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { ProfilePageComponent } from './Components/profile-page/profile-page.component';
import { ScholarshipSearchPageComponent } from './Components/scholarship-search-page/scholarship-search-page.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'college-search',
    component: CollegeSearchPageComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'scholarship-search',
    component: ScholarshipSearchPageComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'register',
    component: RegisterPageComponent,
    canActivate: [notLoggedInGuard],
  },
  {
    path: 'questionnaire',
    component: QuestionnaireStepperComponent,
    canActivate: [questionnaireGuard, notLoggedInGuard],
  },
  { path: '404', component: PageNotFoundComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
