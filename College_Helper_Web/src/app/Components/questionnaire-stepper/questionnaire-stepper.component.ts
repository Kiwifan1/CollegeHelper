import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Gender } from 'src/app/Objects/User/Demographics';
import { ApiCallService } from 'src/app/Services/api-call.service';

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
    private apiCallService: ApiCallService,
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

  handleSubmission() {
    this.submitted = true;
    const user = this.userInfo['username'];
    const password = this.userInfo['password'];

    if (this.apiCallService.login(user, password)) {
      this.router.navigate(['/home']);
    } else {
      this.showSnackBar();
    }
  }
}
