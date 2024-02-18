import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiCallService } from './Services/api-call.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { IncrementCardComponent } from './Components/increment-card/increment-card.component';
import { MatCardActions, MatCardModule } from '@angular/material/card';
import { MatInput, MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginPageComponent } from './Components/login-page/login-page.component';
import { CollegeSearchPageComponent } from './Components/college-search-page/college-search-page.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RegisterPageComponent } from './Components/register-page/register-page.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    IncrementCardComponent,
    LoginPageComponent,
    CollegeSearchPageComponent,
    PageNotFoundComponent,
    RegisterPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardActions,
    MatInput,
    ReactiveFormsModule,
    MatDialogModule,
    MatStepperModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
  ],
  providers: [ApiCallService, provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
