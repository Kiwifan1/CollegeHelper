import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { User } from 'src/app/Objects/User/User';
import { Interest, InterestOtherEnum } from 'src/app/Objects/enums/Interests';
import { AuthService } from 'src/app/Services/auth.service';
import { LoadingService } from 'src/app/Services/loading.service';
import { ScholarshipService } from 'src/app/Services/scholarship.service';
import { EndpointErrorSnackbarComponent } from '../common/endpoint-error-snackbar/endpoint-error-snackbar.component';

@Component({
  selector: 'app-questionnaire-stepper',
  templateUrl: './questionnaire-stepper.component.html',
  styleUrl: './questionnaire-stepper.component.scss',
})
export class QuestionnaireStepperComponent implements OnInit {
  identityForm: FormGroup = new FormGroup({
    ethnicity: new FormControl('', [Validators.required]),
    nationality: new FormControl('', [Validators.required]),
    genderIdentity: new FormControl('', [Validators.required]),
    sexualOrientation: new FormControl('', [Validators.required]),
  });

  demographicInfoForm: FormGroup = new FormGroup({
    citizenship: new FormControl('', [Validators.required]),
    identities: this.identityForm,
  });

  userInfoForm: FormGroup = new FormGroup({
    age: new FormControl('', [
      Validators.min(0),
      Validators.max(120),
      Validators.required,
    ]),
    state: new FormControl('', [Validators.required]),
    addresses: new FormControl(['']),
    demographicInfo: this.demographicInfoForm,
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

  highschoolForm: FormGroup = new FormGroup({
    highschool: new FormControl('', [Validators.required]),
  });

  userForm: FormGroup = new FormGroup({
    userInfo: this.userInfoForm,
    userScores: this.userScoreForm,
    highSchool: this.highschoolForm,
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
    private activatedRoute: ActivatedRoute,
    private scholarshipService: ScholarshipService,
    private loadingService: LoadingService
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

  showSnackBar(error?: string) {
    let msg = {};
    if (!error) {
      msg = {
        error: 'Sorry, something went wrong. Please register again.',
      };
    } else {
      msg = { error: error };
    }
    this.router.navigate(['/register']);
    this.snackBar.openFromComponent(EndpointErrorSnackbarComponent, {
      data: { error: msg },
      duration: 5000,
    });
  }

  makeUser() {
    this.user.addresses = this.userInfoForm.get('addresses')?.value;

    // bind the interests to an Interest[] object
    let interests: Interest[] = [];
    for (let interest of this.userInterestsForm.get('criteriaInterests')
      ?.value) {
      interests.push({
        interestCriteria: interest,
        interestOther: InterestOtherEnum.null,
      });
    }

    // update the interests with the other interests, keeping the criteria interests
    for (
      let i = 0;
      i < this.userInterestsForm.get('otherInterests')?.value.length;
      i++
    ) {
      interests[i].interestOther =
        this.userInterestsForm.get('otherInterests')?.value[i];
    }

    this.user.demographics = {
      age: this.userInfoForm.get('age')?.value,
      demographicInfo: {
        citizenships: [this.demographicInfoForm.get('citizenship')?.value],
        identities: {
          ethnicity: [this.identityForm.get('ethnicity')?.value],
          nationality: [this.identityForm.get('nationality')?.value],
          genderIdentity: [this.identityForm.get('genderIdentity')?.value],
          sexualOrientation: [
            this.identityForm.get('sexualOrientation')?.value,
          ],
        },
        fieldsOfStudy: this.userMajorsForm.get('fieldsOfStudy')?.value,
        interests: interests,
        miscellaneousCriteria: [],
        degreeSeeking: [],
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

    this.loadingService.updateLoadingStatus(true);
    this.authService
      .updateUser(this.user)
      .pipe(
        switchMap((user: any) => {
          if (user) {
            this.authService.setUser(user);
            return this.scholarshipService.predictScholarships(
              this.authService.getUser()
            );
          }
          return new Observable((observer) =>
            observer.next({ success: false })
          );
        })
      )
      .subscribe({
        next: (response: any) => {
          this.loadingService.updateLoadingStatus(false);
          this.router.navigate(['/home']);
        },

        error: (error) => {
          this.loadingService.updateLoadingStatus(false);
          this.showSnackBar(error.error);
        },
      });
  }
}
