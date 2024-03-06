import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './Services/auth.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
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
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import { CollegeDetailGeneralComponent } from './Components/college-search-page/college-detail/college-detail-general/college-detail-general.component';
import { CollegeDetailAdmissionsComponent } from './Components/college-search-page/college-detail/college-detail-admissions/college-detail-admissions.component';
import { CollegeDetailCostsComponent } from './Components/college-search-page/college-detail/college-detail-costs/college-detail-costs.component';
import { SettingsDialogComponent } from './Components/main-nav/settings-dialog/settings-dialog.component';
import { MoneyPipe } from './Components/common/money.pipe';
import { QuestionnaireStepperComponent } from './Components/questionnaire-stepper/questionnaire-stepper.component';
import { GeneralInfoComponent } from './Components/questionnaire-stepper/general-info/general-info.component';
import { ScoreInfoComponent } from './Components/questionnaire-stepper/score-info/score-info.component';
import { CollegeInfoComponent } from './Components/questionnaire-stepper/college-info/college-info.component';
import { MajorInfoComponent } from './Components/questionnaire-stepper/major-info/major-info.component';
import { CareerInfoComponent } from './Components/questionnaire-stepper/career-info/career-info.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReviewComponent } from './Components/questionnaire-stepper/review/review.component';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { ProfilePageComponent } from './Components/profile-page/profile-page.component';
import { ConfirmPasswordDialogComponent } from './Components/common/confirm-password-dialog/confirm-password-dialog.component';
import { ScholarshipSearchPageComponent } from './Components/scholarship-search-page/scholarship-search-page.component';
import { ScholarshipItemComponent } from './Components/scholarship-search-page/scholarship-item/scholarship-item.component';
import { ScholarshipDetailPageComponent } from './Components/scholarship-detail-page/scholarship-detail-page.component';
import { DateColorPipe } from './Components/common/date-color.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    CollegeSearchPageComponent,
    PageNotFoundComponent,
    RegisterPageComponent,
    MainNavComponent,
    CollegeListComponent,
    CollegeDetailComponent,
    CollegeItemComponent,
    SmartTableComponent,
    CollegeDetailGeneralComponent,
    CollegeDetailAdmissionsComponent,
    CollegeDetailCostsComponent,
    SettingsDialogComponent,
    QuestionnaireStepperComponent,
    GeneralInfoComponent,
    ScoreInfoComponent,
    CollegeInfoComponent,
    MajorInfoComponent,
    CareerInfoComponent,
    ReviewComponent,
    HomePageComponent,
    ProfilePageComponent,
    ConfirmPasswordDialogComponent,
    ScholarshipSearchPageComponent,
    ScholarshipItemComponent,
    ScholarshipDetailPageComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    MatCardModule,
    MatInputModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardActions,
    MatInput,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatStepperModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatTabsModule,
    MoneyPipe,
    MatExpansionModule,
    MatCheckboxModule,
    DateColorPipe
  ],
  providers: [AuthService, provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
