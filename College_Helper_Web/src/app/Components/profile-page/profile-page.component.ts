import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  EducationLevel,
  Ethnicity,
  Gender,
  IncomeLevel,
  MaritalStatus,
  Occupation,
} from 'src/app/Objects/User/Demographics';
import { User } from 'src/app/Objects/User/User';
import { AuthService } from 'src/app/Services/auth.service';
import { ConfirmPasswordDialogComponent } from '../common/confirm-password-dialog/confirm-password-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit {
  user: User | null = null;
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

  genderOptions = Object.values(Gender);
  ethnicityOptions = Object.values(Ethnicity);
  incomeOptions = Object.values(IncomeLevel);
  educationOptions = Object.values(EducationLevel);
  occupationOptions = Object.values(Occupation);
  maritalStatusOptions = Object.values(MaritalStatus);

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
        gender: new FormControl(this.user.demographics.gender),
        ethnicity: new FormControl(this.user.demographics.ethnicity),
        income: new FormControl(this.user.demographics.incomeLevel),
        education: new FormControl(this.user.demographics.educationLevel),
        occupation: new FormControl(this.user.demographics.occupation),
        maritalStatus: new FormControl(this.user.demographics.maritalStatus),
      });
    }
  }

  onSubmit() {
    if (this.user) {
      this.user.demographics.age = this.profileForm.value.age;
      this.user.demographics.gender = this.profileForm.value.gender;
      this.user.demographics.ethnicity = this.profileForm.value.ethnicity;
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
            console.log(response)
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
