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
import { MainNavComponent } from './Components/main-nav/main-nav.component';
import { CollegeListComponent } from './Components/college-search-page/college-list/college-list.component';
import { CollegeDetailComponent } from './Components/college-search-page/college-detail/college-detail.component';
import { CollegeItemComponent } from './Components/college-search-page/college-list/college-item/college-item.component';
import { SmartTableComponent } from './Components/common/smart-table/smart-table.component';
import { MatCell, MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    IncrementCardComponent,
    LoginPageComponent,
    CollegeSearchPageComponent,
    PageNotFoundComponent,
    RegisterPageComponent,
    MainNavComponent,
    CollegeListComponent,
    CollegeDetailComponent,
    CollegeItemComponent,
    SmartTableComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
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
    MatTableModule,
  ],
  providers: [ApiCallService, provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
