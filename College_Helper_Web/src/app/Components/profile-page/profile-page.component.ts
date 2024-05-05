import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  EducationLevel,
  IncomeLevel,
  MaritalStatus,
  Occupation,
} from 'src/app/Objects/User/UserDemographics';
import { User } from 'src/app/Objects/User/User';
import { AuthService } from 'src/app/Services/auth.service';
import { ConfirmPasswordDialogComponent } from '../common/confirm-password-dialog/confirm-password-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import {
  EthnicityEnum,
  GenderIdentityEnum,
} from 'src/app/Objects/enums/Demographics';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit {
  user!: User;
  editable: boolean = false;
  profileForm: FormGroup = new FormGroup({
    age: new FormControl(''),
    gender: new FormControl(''),
    ethnicity: new FormControl(''),
    income: new FormControl(''),
    education: new FormControl(''),
    occupation: new FormControl(''),
    maritalStatus: new FormControl(''),
  });

  genderOptions = Object.values(GenderIdentityEnum).filter(
    (value) => typeof value === 'string'
  );
  ethnicityOptions = Object.values(EthnicityEnum).filter(
    (value) => typeof value === 'string'
  );
  incomeOptions = Object.values(IncomeLevel).filter(
    (value) => typeof value === 'string'
  );
  educationOptions = Object.values(EducationLevel).filter(
    (value) => typeof value === 'string'
  );
  occupationOptions = Object.values(Occupation).filter(
    (value) => typeof value === 'string'
  );
  maritalStatusOptions = Object.values(MaritalStatus).filter(
    (value) => typeof value === 'string'
  );

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.setupForm();
  }

  setupForm() {
    if (this.user) {
      this.profileForm = new FormGroup({
        age: new FormControl(this.user.demographics.age),
        gender: new FormControl(
          this.user.demographics.demographicInfo.identities.genderIdentity
        ),
        ethnicity: new FormControl(
          this.user.demographics.demographicInfo.identities.ethnicity
        ),
        income: new FormControl(this.user.demographics.incomeLevel),
        education: new FormControl(this.user.demographics.educationLevel),
        occupation: new FormControl(this.user.demographics.occupation),
        maritalStatus: new FormControl(this.user.demographics.maritalStatus),
      });
      console.log(this.user)
      this.profileForm.controls['age'].setValue(this.user.demographics.age);
      this.profileForm.controls['gender'].setValue(
        this.user.demographics.demographicInfo.identities.genderIdentity
      );
      this.profileForm.controls['ethnicity'].setValue(
        this.user.demographics.demographicInfo.identities.ethnicity
      );
      this.profileForm.controls['income'].setValue(
        this.user.demographics.incomeLevel
      );
      this.profileForm.controls['education'].setValue(
        this.user.demographics.educationLevel
      );
      this.profileForm.controls['occupation'].setValue(
        this.user.demographics.occupation
      );
      this.profileForm.controls['maritalStatus'].setValue(
        this.user.demographics.maritalStatus
      );
    }
  }

  onSubmit() {
    if (this.user) {
      this.user.demographics.age = this.profileForm.value.age;
      this.user.demographics.demographicInfo.identities.genderIdentity =
        this.profileForm.value.gender;
      this.user.demographics.demographicInfo.identities.ethnicity =
        this.profileForm.value.ethnicity;
      this.user.demographics.educationLevel = this.profileForm.value.education;
      this.user.demographics.incomeLevel = this.profileForm.value.income;
      this.user.demographics.occupation = this.profileForm.value.occupation;
      this.user.demographics.maritalStatus =
        this.profileForm.value.maritalStatus;
    }

    const dialogRef = this.dialog.open(ConfirmPasswordDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result && this.user) {
        this.user.password = result;
        this.authService.updateUser(this.user).subscribe({
          next: (response) => {
            console.log(response);
            this.authService.setUser(this.user as User);
            this.snackBar.open('Profile Updated', 'Close', {
              duration: 3000,
            });
          },
          error: (error) => {
            this.snackBar.open('Error updating profile', 'Close', {
              duration: 3000,
            });
          },
        });
      }
    });
  }
}
