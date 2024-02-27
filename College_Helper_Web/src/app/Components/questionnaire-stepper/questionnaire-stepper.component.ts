import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Gender } from 'src/app/Objects/User/Demographics';
import { User } from 'src/app/Objects/User/User';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-questionnaire-stepper',
  templateUrl: './questionnaire-stepper.component.html',
  styleUrl: './questionnaire-stepper.component.scss',
})
export class QuestionnaireStepperComponent implements OnInit {
  // all information is not required, but will be helpful for the user

  userGeneralInfoForm: FormGroup = new FormGroup({
    age: new FormControl('', [Validators.min(0), Validators.max(120)]),
    gender: new FormControl(''),
    ethnicity: new FormControl(''),
    nationality: new FormControl(''),
    educationLevel: new FormControl(''),
    occupation: new FormControl(''),
    incomeLevel: new FormControl(''),
    maritalStatus: new FormControl(''),
    location: new FormControl(''),
  });

  userScoreInfoForm: FormGroup = new FormGroup({
    SAT: new FormControl('', [Validators.min(400), Validators.max(1600)]),
    ACT: new FormControl('', [Validators.min(1), Validators.max(36)]),
    GPA: new FormControl('', [Validators.min(0), Validators.max(4)]),
    AP: new FormControl(''),
    IB: new FormControl(''),
    PSAT10: new FormControl('', [Validators.min(320), Validators.max(1520)]),
    NMSQT: new FormControl('', [Validators.min(320), Validators.max(1520)]),
  });

  userBasicCollegePreferencesForm: FormGroup = new FormGroup({
    colleges: new FormControl(['']),
  });

  userBasicMajorPreferencesForm: FormGroup = new FormGroup({
    majors: new FormControl(['']),
  });

  userBasicCareerPreferencesForm: FormGroup = new FormGroup({
    careers: new FormControl(['']),
  });

  userCurrentCoursesForm: FormGroup = new FormGroup({
    currentCourses: new FormControl(['']),
  });

  // advanced are optional, and will be used to help further specify the areas

  userAdvancedCollegePreferencesForm: FormGroup = new FormGroup({
    collegeSize: new FormControl(''),
    collegeLocation: new FormControl(''),
    collegeCost: new FormControl(''),
    collegeSports: new FormControl(''),
    collegeClubs: new FormControl(''),
    collegeGreekLife: new FormControl(''),
  });

  userAdvancedMajorPreferencesForm: FormGroup = new FormGroup({
    majorType: new FormControl(''),
    majorLocation: new FormControl(''),
  });

  userAdvancedCareerPreferencesForm: FormGroup = new FormGroup({
    careerType: new FormControl(''),
    careerLocation: new FormControl(''),
    careerSalary: new FormControl(''),
    careerHours: new FormControl(''),
    careerBenefits: new FormControl(''),
    careerWorkLife: new FormControl(''),
  });

  private userInfo: any = {};

  submitted: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    localStorage.removeItem('registrationComplete');
    const info = localStorage.getItem('userInfo');
    if (info) {
      this.userInfo = JSON.parse(info);
    } else {
      this.showSnackBar();
    }
    localStorage.removeItem('userInfo');
  }

  showSnackBar() {
    this.router.navigate(['/register']);
    this.snackBar.open(
      'Sorry, something went wrong. Please register again.',
      'Close',
      {
        duration: 5000,
      }
    );
  }

  makeUser(): User {
    const user: User = {
      username: this.userInfo['username'],
      password: this.userInfo['password'],
      address: {
        street: this.userGeneralInfoForm.get('location')?.value,
        city: '',
        state: '',
        zip: '',
        country: '',
        website: '',
      },
      demographics: {
        age: this.userGeneralInfoForm.get('age')?.value,
        gender: this.userGeneralInfoForm.get('gender')?.value,
        ethnicity: this.userGeneralInfoForm.get('ethnicity')?.value,
        educationLevel: this.userGeneralInfoForm.get('educationLevel')?.value,
        occupation: this.userGeneralInfoForm.get('occupation')?.value,
        incomeLevel: this.userGeneralInfoForm.get('incomeLevel')?.value,
        maritalStatus: this.userGeneralInfoForm.get('maritalStatus')?.value,
      },
      scores: {
        SAT: this.userScoreInfoForm.get('SAT')?.value,
        ACT: this.userScoreInfoForm.get('ACT')?.value,
        GPA: this.userScoreInfoForm.get('GPA')?.value,
        AP: this.userScoreInfoForm.get('AP')?.value,
        IB: this.userScoreInfoForm.get('IB')?.value,
        PSAT10: this.userScoreInfoForm.get('PSAT10')?.value,
        NMSQT: this.userScoreInfoForm.get('NMSQT')?.value,
      },
      collegePreferences:
        this.userBasicCollegePreferencesForm.get('colleges')?.value,
      majorPreferences: this.userBasicMajorPreferencesForm.get('majors')?.value,
      careerPreferences:
        this.userBasicCareerPreferencesForm.get('careers')?.value,
      currentCourses: this.userCurrentCoursesForm.get('currentCourses')?.value,
      Email: this.userInfo['email'],
    };
    return user;
  }

  handleSubmission() {
    this.submitted = true;
    const user = this.userInfo['username'];
    const password = this.userInfo['password'];

    this.authService
      .createUser(this.makeUser())
      .pipe(
        switchMap((created) => {
          console.log(created);
          if (created) {
            return this.authService.login(user, password);
          }
          return new Observable((observer) => {
            observer.next(false);
            observer.complete();
          });
        })
      )
      .subscribe((loggedIn) => {
        if (loggedIn) {
          this.router.navigate(['/home']);
        } else {
          this.showSnackBar();
        }
      });
  }
}
