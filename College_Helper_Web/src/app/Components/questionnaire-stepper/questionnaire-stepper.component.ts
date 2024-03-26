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
  userInfoForm: FormGroup = new FormGroup({
    age: new FormControl('', [
      Validators.min(0),
      Validators.max(120),
      Validators.required,
    ]),
    addresses: new FormControl(['']),
    demographicInfo: new FormGroup({
      citizenship: new FormControl('', [Validators.required]),
      identities: new FormGroup({
        ethnicity: new FormControl('', [Validators.required]),
        nationality: new FormControl('', [Validators.required]),
        genderIdentity: new FormControl('', [Validators.required]),
        sexualOrientation: new FormControl('', [Validators.required]),
      }),
    }),
    educationLevel: new FormControl('', [Validators.required]),
    occupation: new FormControl('', [Validators.required]),
    incomeLevel: new FormControl('', [Validators.required]),
    maritalStatus: new FormControl('', [Validators.required]),
  });

  userScoreForm: FormGroup = new FormGroup({
    SAT: new FormControl('', [Validators.min(400), Validators.max(1600)]),
    ACT: new FormControl('', [Validators.min(1), Validators.max(36)]),
    GPA: new FormControl('', [Validators.min(0), Validators.max(4)]),
    AP: new FormControl(''),
    IB: new FormControl(''),
    PSAT10: new FormControl('', [Validators.min(320), Validators.max(1520)]),
    NMSQT: new FormControl('', [Validators.min(320), Validators.max(1520)]),
  });

  userMajorsForm: FormGroup = new FormGroup({
    fieldsOfStudy: new FormControl(['']),
  });

  userInterestsForm: FormGroup = new FormGroup({
    criteriaInterests: new FormControl(['']),
    otherInterests: new FormControl(['']),
  });

  userCollegeForm: FormGroup = new FormGroup({
    collegeSize: new FormControl('', [Validators.required]),
    collegeCost: new FormControl('', [Validators.required]),
    collegeSports: new FormControl('', [Validators.required]),
    collegeClubs: new FormControl('', [Validators.required]),
    collegeGreekLife: new FormControl('', [Validators.required]),
  });

  userForm: FormGroup = new FormGroup({
    userInfo: this.userInfoForm,
    userScores: this.userScoreForm,
    userMajors: this.userMajorsForm,
    userInterests: this.userInterestsForm,
    userCollege: this.userCollegeForm,
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
      street: this.userInfoForm.get('location')?.value,
      city: '',
      province: '',
      postCode: '',
      country: '',
      website: '',
      latitude: '',
      longitude: '',
    };

    this.user.demographics = {
      age: this.userInfoForm.get('age')?.value,
      demographicInfo: {
        identities: {
          nationality: [],
          genderIdentity: [],
          sexualOrientation: [],
          ethnicity: [this.userInfoForm.get('ethnicity')?.value],
        },
        citizenships: [],
        degreeSeeking: [],
        fieldsOfStudy: [],
        interests: [],
        miscellaneousCriteria: [],
      },
      educationLevel: this.userInfoForm.get('educationLevel')?.value,
      occupation: this.userInfoForm.get('occupation')?.value,
      incomeLevel: this.userInfoForm.get('incomeLevel')?.value,
      maritalStatus: this.userInfoForm.get('maritalStatus')?.value,
    };

    this.user.scores = {
      SAT: this.userScoreForm.get('SAT')?.value,
      ACT: this.userScoreForm.get('ACT')?.value,
      GPA: this.userScoreForm.get('GPA')?.value,
      AP: this.userScoreForm.get('AP')?.value,
      IB: this.userScoreForm.get('IB')?.value,
      PSAT10: this.userScoreForm.get('PSAT10')?.value,
      NMSQT: this.userScoreForm.get('NMSQT')?.value,
    };

    this.user.majorPreferences = [this.userMajorsForm.get('majors')?.value];
    this.user.careerPreferences = [
      this.userInterestsForm.get('careers')?.value,
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
