import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loginGuard } from './guards/login-guard.guard';
import { CollegeSearchPageComponent } from './Components/college-search-page/college-search-page.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { LoginPageComponent } from './Components/login-page/login-page.component';
import { RegisterPageComponent } from './Components/register-page/register-page.component';
import { IncrementCardComponent } from './Components/increment-card/increment-card.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
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
  },
  { path: '**', redirectTo: '/404', pathMatch: 'full' },
  { path: '404', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
