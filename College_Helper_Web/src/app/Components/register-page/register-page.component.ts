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
import { ErrorStateMatcher } from '../login-page/login-page.component';
import { passwordMatchValidator } from '../common/validators';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  userForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  passwordForm = new FormGroup(
    {
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl(''),
    },
    {
      validators: [passwordMatchValidator('password', 'confirmPassword')],
    }
  );

  registered: boolean = false;
  token: string = '';

  matcher = new ErrorStateMatcher();

  constructor(private router: Router, private apiCallService: ApiCallService) {}

  ngOnInit(): void {}

  emptyEmail() {
    return this.userForm.get('email')?.hasError('required');
  }

  invalidEmail() {
    return (
      this.userForm.get('email')?.hasError('email') &&
      !this.userForm.get('email')?.hasError('required')
    );
  }

  invalidPassword() {
    return (
      this.passwordForm.get('password')?.hasError('required') &&
      this.passwordForm.get('password')?.touched
    );
  }

  tooSmallPassword() {
    return (
      this.passwordForm.get('password')?.hasError('minlength') &&
      !this.passwordForm.get('password')?.hasError('required')
    );
  }

  invalidConfirmPassword() {
    let invalidConfirm =
      this.passwordForm.get('password')?.value !==
      this.passwordForm.get('confirmPassword')?.value;
    return invalidConfirm;
  }

  emptyUsername() {
    return this.userForm.get('username')?.hasError('required');
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
