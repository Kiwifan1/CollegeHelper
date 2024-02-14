import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiCallService } from 'src/app/Services/api-call.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  firstFormGroup = this.formBuilder.group({
    username: ['', Validators.required],
  });

  secondFormGroup = this.formBuilder.group({
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required, Validators.minLength(6)],
    confirmPassword: ['', Validators.required],
  });

  registered: boolean = false;
  token: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private apiCallService: ApiCallService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  invalidEmail() {
    return (
      this.secondFormGroup.get('email')?.hasError('email') &&
      !this.secondFormGroup.get('email')?.hasError('required')
    );
  }

  emptyEmail() {
    return this.secondFormGroup.get('email')?.hasError('required');
  }

  invalidPassword() {
    return this.secondFormGroup.get('password')?.hasError('required');
  }

  tooSmallPassword() {
    return (
      this.secondFormGroup.get('password')?.hasError('minlength') &&
      !this.secondFormGroup.get('password')?.hasError('required')
    );
  }

  invalidConfirmPassword() {
    return (
      !this.secondFormGroup.get('confirmPassword')?.hasError('required') &&
      this.secondFormGroup.get('password')?.value !==
        this.secondFormGroup.get('confirmPassword')?.value
    );
  }

  emptyUsername() {
    return this.firstFormGroup.get('username')?.hasError('required');
  }

  register(stepper: any) {
    console.log('Registering user...');
  }

  login() {
    this.router.navigate(['/login']);
  }

  createAccount() {
    // check for email account existence
    // if exists -> error
    // else -> save account
  }
}
