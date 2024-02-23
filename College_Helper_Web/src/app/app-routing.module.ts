import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loginGuard } from './guards/login.guard';
import { CollegeSearchPageComponent } from './Components/college-search-page/college-search-page.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { LoginPageComponent } from './Components/login-page/login-page.component';
import { RegisterPageComponent } from './Components/register-page/register-page.component';
import { IncrementCardComponent } from './Components/increment-card/increment-card.component';
import { QuestionnaireStepperComponent } from './Components/questionnaire-stepper/questionnaire-stepper.component';
import { notLoggedInGuard } from './guards/not-logged-in.guard';
import { questionnaireGuard } from './guards/questionnaire.guard';

const routes: Routes = [
  {
    path: 'home',
    component: PageNotFoundComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'college-search',
    component: CollegeSearchPageComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'increment',
    component: IncrementCardComponent,
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
