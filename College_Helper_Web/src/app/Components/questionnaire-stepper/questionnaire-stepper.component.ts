import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { User } from 'src/app/Objects/User/User';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-questionnaire-stepper',
  templateUrl: './questionnaire-stepper.component.html',
  styleUrl: './questionnaire-stepper.component.scss',
})
export class QuestionnaireStepperComponent implements OnInit {
  userGeneralInfoForm: FormGroup = new FormGroup({
    age: new FormControl('', [
      Validators.min(0),
      Validators.max(120),
      Validators.required,
    ]),
    addresses: new FormControl(['']),
    gender: new FormControl('', [Validators.required]),
    ethnicity: new FormControl('', [Validators.required]),
    educationLevel: new FormControl('', [Validators.required]),
    occupation: new FormControl('', [Validators.required]),
    incomeLevel: new FormControl('', [Validators.required]),
    maritalStatus: new FormControl('', [Validators.required]),
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

  private user!: User;

  submitted: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.data.subscribe((data: any) => {
      this.user = data.user;
    });
  }

  ngOnInit(): void {
    localStorage.removeItem('registrationComplete');
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!this.user) {
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

  makeUser() {
    this.user.address = {
      street: this.userGeneralInfoForm.get('location')?.value,
      city: '',
      province: '',
      postCode: '',
      country: '',
      website: '',
      latitude: '',
      longitude: '',
    };

    this.user.demographics = {
      age: this.userGeneralInfoForm.get('age')?.value,
      gender: this.userGeneralInfoForm.get('gender')?.value,
      demographicInfo: {
        identities: {
          geographicalRegion: [],
          genderIdentity: [],
          sexualOrientation: [],
          ethnicity: [this.userGeneralInfoForm.get('ethnicity')?.value],
        },
        citizenships: [],
        degreeSeeking: [],
        fieldsOfStudy: [],
        interests: [],
        miscellaneousCriteria: [],
      },
      educationLevel: this.userGeneralInfoForm.get('educationLevel')?.value,
      occupation: this.userGeneralInfoForm.get('occupation')?.value,
      incomeLevel: this.userGeneralInfoForm.get('incomeLevel')?.value,
      maritalStatus: this.userGeneralInfoForm.get('maritalStatus')?.value,
    };

    this.user.scores = {
      SAT: this.userScoreInfoForm.get('SAT')?.value,
      ACT: this.userScoreInfoForm.get('ACT')?.value,
      GPA: this.userScoreInfoForm.get('GPA')?.value,
      AP: this.userScoreInfoForm.get('AP')?.value,
      IB: this.userScoreInfoForm.get('IB')?.value,
      PSAT10: this.userScoreInfoForm.get('PSAT10')?.value,
      NMSQT: this.userScoreInfoForm.get('NMSQT')?.value,
    };

    this.user.majorPreferences = [
      this.userBasicMajorPreferencesForm.get('majors')?.value,
    ];
    this.user.careerPreferences = [
      this.userBasicCareerPreferencesForm.get('careers')?.value,
    ];
  }

  handleSubmission() {
    this.submitted = true;
    this.makeUser();

    this.authService
      .updateUser(this.user)
      .pipe(
        switchMap((user: any) => {
          if (user) {
            this.authService.setUser(user);
            return this.authService.login(
              this.user.username,
              this.user.password
            );
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
