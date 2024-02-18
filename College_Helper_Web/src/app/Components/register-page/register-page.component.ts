import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmPassword: new FormControl('', [Validators.required]),
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

  emptyEmail() {
    return this.form.get('username')?.hasError('required');
  }

  invalidEmail() {
    return (
      this.form.get('username')?.hasError('email') &&
      !this.form.get('username')?.hasError('required')
    );
  }

  invalidPassword() {
    return (
      this.form.get('password')?.hasError('required') &&
      this.form.get('password')?.touched
    );
  }

  tooSmallPassword() {
    return (
      this.form.get('password')?.hasError('minlength') &&
      !this.form.get('password')?.hasError('required')
    );
  }

  invalidConfirmPassword() {
    return (
      this.form.get('password')?.value ===
      this.form.get('confirmPassword')?.value
    );
  }

  emptyUsername() {
    return this.form.get('username')?.hasError('required');
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
