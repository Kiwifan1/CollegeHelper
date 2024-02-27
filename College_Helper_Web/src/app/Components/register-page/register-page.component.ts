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
import { AuthService } from 'src/app/Services/auth.service';
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

  constructor(private router: Router, private authService: AuthService) {}

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

  goBack() {
    this.router.navigate(['/login']);
  }

  register() {
    // TODO: Implement
    let userInfo = {
      username: '',
      email: '',
      password: '',
    };
    const password = this.passwordForm.get('password')?.value;
    const username = this.userForm.get('username')?.value;
    const email = this.userForm.get('email')?.value;
    userInfo.username = username;
    userInfo.email = email;
    userInfo.password = password ?? '';

    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    localStorage.setItem('registerComplete', 'true');
    this.router.navigate(['/questionnaire']);
  }

  createAccount() {
    this.authService
      .checkIfUserExists(this.userForm.get('email')?.value)
      .subscribe({
        next: (res: any) => {
          if (res.exists) {
            console.log('User already exists');
          } else {
            this.register();
          }
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    this.register();
  }
}
